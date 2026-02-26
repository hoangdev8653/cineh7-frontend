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

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Lấy token từ Zustand Store
        const token = useAuthStore.getState().accessToken;

        // Không gửi token cho các request login/register
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

// Biến để tránh việc gọi refresh token nhiều lần cùng lúc
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

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as any;

        // Nếu lỗi 401 và không phải là request login hoặc refresh token
        const isAuthRequest = originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/refresh-token');

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthRequest) {
            if (isRefreshing) {
                // Nếu đang refresh, đẩy các request tiếp theo vào hàng đợi
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
                // Gọi API Refresh Token
                // Backend cần endpoint này và trả về access_token mới
                // Refresh token sẽ được tự động gửi kèm qua HttpOnly Cookie
                axiosInstance.post('/auth/refresh-token')
                    .then((res: any) => {
                        const { accessToken } = res; // Giả sử backend trả về field accessToken

                        // Cập nhật token mới vào Zustand Store
                        useAuthStore.getState().setAccessToken(accessToken);

                        // Thêm token mới vào request hiện tại
                        originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;

                        processQueue(null, accessToken);
                        resolve(axiosInstance(originalRequest));
                    })
                    .catch((err) => {
                        processQueue(err, null);
                        useAuthStore.getState().clearAuth(); // Xóa auth nếu refresh thất bại
                        // window.location.href = '/login';
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
