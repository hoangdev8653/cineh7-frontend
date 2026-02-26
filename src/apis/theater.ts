import axiosInstance from "../utils/axios-Instance"
import type { TheaterDto } from "../types/theater.types"

export const getAllTheaters = async () => {
    return await axiosInstance({
        method: 'GET',
        url: '/theater',
    })
}

export const getTheaterById = async (id: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/theater/${id}`,
    })
}

export const createTheater = async (theaterDto: TheaterDto) => {
    return await axiosInstance({
        method: 'POST',
        url: '/theater',
        data: theaterDto,
    })
}

export const updateTheater = async (id: string, theaterDto: TheaterDto) => {
    return await axiosInstance({
        method: 'PUT',
        url: `/theater/${id}`,
        data: theaterDto,
    })
}

export const deleteTheater = async (id: string) => {
    return await axiosInstance({
        method: 'DELETE',
        url: `/theater/${id}`,
    })
}