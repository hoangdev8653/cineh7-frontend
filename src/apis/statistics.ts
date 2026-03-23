import axiosInstance from "../utils/axios-Instance"

export const getAllOverview = async () => {
    return await axiosInstance({
        method: 'GET',
        url: '/statistics/overview'
    })
}

export const getRevenue = async (period: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/statistics/revenue?period=${period}`
    })
}

export const getTopMovie = async () => {
    return await axiosInstance({
        method: 'GET',
        url: '/statistics/top-movies'
    })
}

export const getOrders = async (period: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/statistics/orders?period=${period}`
    })
}