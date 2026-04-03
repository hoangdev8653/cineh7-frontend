import axios from 'axios';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { BASE_URL_LOCAL } from './constant';
import { useAuthStore } from '../store/useAuthStore';

const axiosInstance = axios.create({
    baseURL: BASE_URL_LOCAL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = useAuthStore.getState().accessToken;

        const isAuthRequest = config.url?.includes('/auth/login') || config.url?.includes('/auth/register');

        if (token && config.headers && !isAuthRequest) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as any;

        const isAuthRequest = originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/refresh-token');

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthRequest) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise(function (resolve, reject) {
                axiosInstance.post('/auth/refresh-token')
                    .then((res: any) => {
                        const { data: { access_token } } = res;

                        useAuthStore.getState().setAccessToken(access_token);

                        originalRequest.headers['Authorization'] = 'Bearer ' + access_token;

                        processQueue(null, access_token);
                        resolve(axiosInstance(originalRequest));
                    })
                    .catch((err) => {
                        processQueue(err, null);
                        useAuthStore.getState().clearAuth();
                        window.location.href = '/login';
                        reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });
        }

        const customError = {
            ...error,
            message: (error.response?.data as any)?.message || error.message || 'Đã có lỗi xảy ra',
            status: error.response?.status
        };

        return Promise.reject(customError);
    }
);

export default axiosInstance;
