import axiosInstance from "../utils/axios-Instance"
import type { ShowtimeDto } from "../types/showtime.types"

export const getAllShowtimes = async () => {
    return await axiosInstance({
        method: 'GET',
        url: '/showtimes',
    })
}

export const getShowtimeById = async (id: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/showtimes/${id}`,
    })
}

export const createShowtime = async (showtimeDto: ShowtimeDto) => {
    return await axiosInstance({
        method: 'POST',
        url: '/showtimes',
        data: showtimeDto,
    })
}

export const updateShowtime = async (id: string, showtimeDto: ShowtimeDto) => {
    return await axiosInstance({
        method: 'PUT',
        url: `/showtimes/${id}`,
        data: showtimeDto,
    })
}

export const deleteShowtime = async (id: string) => {
    return await axiosInstance({
        method: 'DELETE',
        url: `/showtimes/${id}`,
    })
}