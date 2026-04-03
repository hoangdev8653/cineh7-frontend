import axiosInstance from "../utils/axios-Instance"
import type { ShowtimeDto } from "../types/showtime.types"

export const getAllShowtimes = async (params?: { page?: number; limit?: number }) => {
    return await axiosInstance({
        method: 'GET',
        url: '/showtime',
        params,
    })
}

export const getShowtimeById = async (id: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/showtime/${id}`,
    })
}

export const getShowtimeByMovieId = async (movieId: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/showtime/movie/${movieId}`,
    })
}



export const getShowtimeGrouped = async (movieId: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/showtime/grouped?movieid=${movieId}`,
    })
}

export const createShowtime = async (showtimeDto: ShowtimeDto) => {
    return await axiosInstance({
        method: 'POST',
        url: '/showtime',
        data: showtimeDto,
    })
}

export const updateShowtime = async (id: string, showtimeDto: ShowtimeDto) => {
    return await axiosInstance({
        method: 'PUT',
        url: `/showtime/${id}`,
        data: showtimeDto,
    })
}

export const deleteShowtime = async (id: string) => {
    return await axiosInstance({
        method: 'DELETE',
        url: `/showtime/${id}`,
    })
}