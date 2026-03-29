import axiosInstance from "../utils/axios-Instance"
import type { TheaterDto } from "../types/theater.types"

export const getAllTheaters = async (params?: { page?: number; limit?: number }) => {
    return await axiosInstance({
        method: 'GET',
        url: '/theater',
        params,
    })
}

export const getTheaterById = async (id: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/theater/${id}`,
    })
}

export const createTheater = async (theaterDto: TheaterDto | FormData) => {
    return await axiosInstance({
        method: 'POST',
        url: '/theater',
        data: theaterDto,
        headers: theaterDto instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined
    })
}

export const updateTheater = async (id: string, theaterDto: TheaterDto | FormData) => {
    return await axiosInstance({
        method: 'PUT',
        url: `/theater/${id}`,
        data: theaterDto,
        headers: theaterDto instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined
    })
}

export const deleteTheater = async (id: string) => {
    return await axiosInstance({
        method: 'DELETE',
        url: `/theater/${id}`,
    })
}