import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllSeats, createSeat, deleteSeat, getSeatById, updateSeat } from "../apis/seat"
import type { SeatDto } from "../types/seat.types"

export const useSeats = () => {
    return useQuery({
        queryKey: ["seats"],
        queryFn: async () => {
            const response = await getAllSeats();
            return response.data;
        },
    });
};

export const useSeatDetail = (id: string) => {
    return useQuery({
        queryKey: ["seat", id],
        queryFn: async () => {
            const response = await getSeatById(id);
            return response.data;
        },
        enabled: !!id,
    });
};

export const useSeatMutations = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (seatDto: SeatDto) => createSeat(seatDto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["seats"] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, seatDto }: { id: string; seatDto: SeatDto }) =>
            updateSeat(id, seatDto),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["seats"] });
            queryClient.invalidateQueries({ queryKey: ["seat", variables.id] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteSeat(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["seats"] });
        },
    });

    return {
        createSeat: createMutation,
        updateSeat: updateMutation,
        deleteSeat: deleteMutation,
    };
};