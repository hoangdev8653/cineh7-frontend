import axiosInstance from "../utils/axios-Instance"
import type { SeatDto } from "../types/seat.types"

export const getAllSeats = async () => {
    return await axiosInstance({
        method: 'GET',
        url: '/seats',
    })
}

export const getSeatById = async (id: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/seats/${id}`,
    })
}

export const getSeatByRoom = async (roomId: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/seat/room/${roomId}`,
    })
}

export const getSeatByShowTime = async (showTimeId: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/seat/showtime/${showTimeId}`,
    })
}

export const createSeat = async (seatDto: SeatDto) => {
    return await axiosInstance({
        method: 'POST',
        url: '/seats',
        data: seatDto,
    })
}

export const updateSeat = async (id: string, seatDto: SeatDto) => {
    return await axiosInstance({
        method: 'PUT',
        url: `/seats/${id}`,
        data: seatDto,
    })
}

export const deleteSeat = async (id: string) => {
    return await axiosInstance({
        method: 'DELETE',
        url: `/seats/${id}`,
    })
}