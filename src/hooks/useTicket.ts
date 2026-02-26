import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllTickets, createTicket, deleteTicket, getTicketById, updateTicket } from "../apis/ticket"
import type { TicketDto } from "../types/ticket.types"

export const useTickets = () => {
    return useQuery({
        queryKey: ["tickets"],
        queryFn: async () => {
            const response = await getAllTickets();
            return response.data;
        },
    });
};

export const useTicketDetail = (id: string) => {
    return useQuery({
        queryKey: ["ticket", id],
        queryFn: async () => {
            const response = await getTicketById(id);
            return response.data;
        },
        enabled: !!id,
    });
};

export const useTicketMutations = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (ticketDto: TicketDto) => createTicket(ticketDto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, ticketDto }: { id: string; ticketDto: TicketDto }) =>
            updateTicket(id, ticketDto),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
            queryClient.invalidateQueries({ queryKey: ["ticket", variables.id] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteTicket(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
        },
    });

    return {
        createTicket: createMutation,
        updateTicket: updateMutation,
        deleteTicket: deleteMutation,
    };
};