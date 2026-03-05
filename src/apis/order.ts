import axiosInstance from "../utils/axios-Instance"
import type { OrderDto } from "../types/order.types"

export const getAllOrders = async () => {
    return await axiosInstance({
        method: 'GET',
        url: '/order',
    })
}

export const getOrderById = async (id: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/order/${id}`,
    })
}

export const createOrder = async (orderDto: OrderDto) => {
    return await axiosInstance({
        method: 'POST',
        url: '/order',
        data: orderDto,
    })
}

export const updateOrder = async (id: string, orderDto: OrderDto) => {
    return await axiosInstance({
        method: 'PUT',
        url: `/order/${id}`,
        data: orderDto,
    })
}

export const deleteOrder = async (id: string) => {
    return await axiosInstance({
        method: 'DELETE',
        url: `/order/${id}`,
    })
}