import axiosInstance from "../utils/axios-Instance"
import type { IUser } from "../types/auth.types"

export const getAllUsers = async () => {
    return await axiosInstance({
        method: 'GET',
        url: '/user',
    })
}

export const getUserById = async (id: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/user/${id}`,
    })
}

export const updateUser = async (userDto: Partial<IUser> | FormData) => {
    return await axiosInstance({
        method: 'PATCH',
        url: `/user/update`,
        data: userDto,
        headers: userDto instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
    })
}

export const updateRole = async (id: string, userDto: Partial<IUser>) => {
    return await axiosInstance({
        method: 'PUT',
        url: `/user/${id}/role`,
        data: userDto,
    })
}

export const deleteUser = async (id: string) => {
    return await axiosInstance({
        method: 'DELETE',
        url: `/user/${id}`,
    })
}
