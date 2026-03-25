import axiosInstance from "../utils/axios-Instance"
import type { EventDto } from "../types/event.types"

export const getAllEvents = async () => {
    return await axiosInstance({
        method: 'GET',
        url: '/event',
    })
}

export const getEventById = async (id: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/event/${id}`,
    })
}

export const createEvent = async (eventDto: EventDto | FormData) => {
    return await axiosInstance({
        method: 'POST',
        url: '/event',
        data: eventDto,
        headers: eventDto instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined
    })
}

export const updateEvent = async (id: string, eventDto: EventDto | FormData) => {
    return await axiosInstance({
        method: 'PUT',
        url: `/event/${id}`,
        data: eventDto,
        headers: eventDto instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined
    })
}

export const deleteEvent = async (id: string) => {
    return await axiosInstance({
        method: 'DELETE',
        url: `/event/${id}`,
    })
}