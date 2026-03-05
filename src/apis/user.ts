import axiosInstance from "../utils/axios-Instance"
import type { IUser } from "../types/auth.types"

export const getAllUsers = async () => {
    return await axiosInstance({
        method: 'GET',
        url: '/auth/users',
    })
}

export const getUserById = async (id: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/auth/user/${id}`,
    })
}

export const updateUser = async (id: string, userDto: Partial<IUser>) => {
    return await axiosInstance({
        method: 'PUT',
        url: `/auth/user/${id}`,
        data: userDto,
    })
}

export const deleteUser = async (id: string) => {
    return await axiosInstance({
        method: 'DELETE',
        url: `/auth/user/${id}`,
    })
}
