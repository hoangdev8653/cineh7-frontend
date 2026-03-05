import axiosInstance from "../utils/axios-Instance"
import type { RoomDto } from "../types/room.types"

export const getAllRooms = async () => {
    return await axiosInstance({
        method: 'GET',
        url: '/room',
    })
}

export const getRoomById = async (id: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/room/${id}`,
    })
}

export const createRoom = async (roomDto: RoomDto) => {
    return await axiosInstance({
        method: 'POST',
        url: '/room',
        data: roomDto,
    })
}

export const updateRoom = async (id: string, roomDto: RoomDto) => {
    return await axiosInstance({
        method: 'PUT',
        url: `/room/${id}`,
        data: roomDto,
    })
}

export const deleteRoom = async (id: string) => {
    return await axiosInstance({
        method: 'DELETE',
        url: `/room/${id}`,
    })
}