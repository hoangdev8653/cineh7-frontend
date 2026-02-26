import axiosInstance from "../utils/axios-Instance"
import type { TicketDto } from "../types/ticket.types"

export const getAllTickets = async () => {
    return await axiosInstance({
        method: 'GET',
        url: '/tickets',
    })
}

export const getTicketById = async (id: string) => {
    return await axiosInstance({
        method: 'GET',
        url: `/tickets/${id}`,
    })
}

export const createTicket = async (ticketDto: TicketDto) => {
    return await axiosInstance({
        method: 'POST',
        url: '/tickets',
        data: ticketDto,
    })
}

export const updateTicket = async (id: string, ticketDto: TicketDto) => {
    return await axiosInstance({
        method: 'PUT',
        url: `/tickets/${id}`,
        data: ticketDto,
    })
}

export const deleteTicket = async (id: string) => {
    return await axiosInstance({
        method: 'DELETE',
        url: `/tickets/${id}`,
    })
}