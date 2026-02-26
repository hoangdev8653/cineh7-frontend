import axiosInstance from "../utils/axios-Instance"
import type { TheaterSystemDto } from "../types/theater-system.type"

export const getAllTheaterSystems = async () => {
    return await axiosInstance({
        method: 'GET',
        url: '/theater-system',
    })
}

export const getTheaterSystemById = async (id: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/theater-system/${id}`,
    })
}

export const createTheaterSystem = async (theaterSystemDto: TheaterSystemDto) => {
    return await axiosInstance({
        method: 'POST',
        url: '/theater-system',
        data: theaterSystemDto,
    })
}

export const updateTheaterSystem = async (id: string, theaterSystemDto: TheaterSystemDto) => {
    return await axiosInstance({
        method: 'PUT',
        url: `/theater-system/${id}`,
        data: theaterSystemDto,
    })
}

export const deleteTheaterSystem = async (id: string) => {
    return await axiosInstance({
        method: 'DELETE',
        url: `/theater-system/${id}`,
    })
}