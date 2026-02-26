import axiosInstance from "../utils/axios-Instance"
import type { LoginDto, RegisterDto } from "../types/auth.types"

export const login = async (loginDto: LoginDto) => {
    return await axiosInstance({
        method: 'POST',
        url: '/auth/login',
        data: loginDto,
    })
}

export const register = async (registerDto: RegisterDto) => {
    return await axiosInstance({
        method: 'POST',
        url: '/auth/register',
        data: registerDto,
    })
}

export const logout = async () => {
    return await axiosInstance({
        method: 'POST',
        url: '/auth/logout',
    })
}

export const getProfile = async () => {
    return await axiosInstance({
        method: 'GET',
        url: '/auth/profile',
    })
}

