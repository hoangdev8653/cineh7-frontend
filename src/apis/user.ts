import axiosInstance from "../utils/axios-Instance"
import type { IUser } from "../types/auth.types"

export const getAllUsers = async () => {
    return await axiosInstance({
        method: 'GET',
        url: '/users',
    })
}

export const getUserById = async (id: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/users/${id}`,
    })
}

export const updateUser = async (id: string, userDto: Partial<IUser>) => {
    return await axiosInstance({
        method: 'PUT',
        url: `/users/${id}`,
        data: userDto,
    })
}

export const deleteUser = async (id: string) => {
    return await axiosInstance({
        method: 'DELETE',
        url: `/users/${id}`,
    })
}
