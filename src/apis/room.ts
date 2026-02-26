import axiosInstance from "../utils/axios-Instance"
import type { RoomDto } from "../types/room.types"

export const getAllRooms = async () => {
    return await axiosInstance({
        method: 'GET',
        url: '/rooms',
    })
}

export const getRoomById = async (id: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/rooms/${id}`,
    })
}

export const createRoom = async (roomDto: RoomDto) => {
    return await axiosInstance({
        method: 'POST',
        url: '/rooms',
        data: roomDto,
    })
}

export const updateRoom = async (id: string, roomDto: RoomDto) => {
    return await axiosInstance({
        method: 'PUT',
        url: `/rooms/${id}`,
        data: roomDto,
    })
}

export const deleteRoom = async (id: string) => {
    return await axiosInstance({
        method: 'DELETE',
        url: `/rooms/${id}`,
    })
}