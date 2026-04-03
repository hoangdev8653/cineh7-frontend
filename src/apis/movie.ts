import axiosInstance from "../utils/axios-Instance"
import type { MovieDto } from "../types/movie.types"

export const getAllMovies = async (params?: { page?: number; limit?: number; title?: string; status?: string }) => {
    return await axiosInstance({
        method: 'GET',
        url: '/movie',
        params,
    })
}

export const getMovieById = async (id: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/movie/${id}`,
    })
}

export const createMovie = async (movieDto: MovieDto | FormData) => {
    return await axiosInstance({
        method: 'POST',
        url: '/movie',
        data: movieDto,
    })
}

export const updateMovie = async (id: string, movieDto: MovieDto | FormData) => {
    return await axiosInstance({
        method: 'PUT',
        url: `/movie/${id}`,
        data: movieDto,
    })
}

export const deleteMovie = async (id: string) => {
    return await axiosInstance({
        method: 'DELETE',
        url: `/movie/${id}`,
    })
}