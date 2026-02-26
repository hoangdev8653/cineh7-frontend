import axiosInstance from "../utils/axios-Instance"
import type { NewsEventDto } from "../types/news-event.types"

export const getAllNewsEvents = async () => {
    return await axiosInstance({
        method: 'GET',
        url: '/news-events',
    })
}

export const getNewsEventById = async (id: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/news-events/${id}`,
    })
}

export const createNewsEvent = async (newsEventDto: NewsEventDto) => {
    return await axiosInstance({
        method: 'POST',
        url: '/news-events',
        data: newsEventDto,
    })
}

export const updateNewsEvent = async (id: string, newsEventDto: NewsEventDto) => {
    return await axiosInstance({
        method: 'PUT',
        url: `/news-events/${id}`,
        data: newsEventDto,
    })
}

export const deleteNewsEvent = async (id: string) => {
    return await axiosInstance({
        method: 'DELETE',
        url: `/news-events/${id}`,
    })
}