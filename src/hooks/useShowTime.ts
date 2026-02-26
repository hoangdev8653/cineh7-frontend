import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllShowtimes, createShowtime, deleteShowtime, getShowtimeById, updateShowtime } from "../apis/showtime"
import type { ShowtimeDto } from "../types/showtime.types"

export const useShowTimes = () => {
    return useQuery({
        queryKey: ["showtimes"],
        queryFn: async () => {
            const response = await getAllShowtimes();
            return response.data;
        },
    });
};

export const useShowTimeDetail = (id: string) => {
    return useQuery({
        queryKey: ["showtime", id],
        queryFn: async () => {
            const response = await getShowtimeById(id);
            return response.data;
        },
        enabled: !!id,
    });
};

export const useShowTimeMutations = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (showTimeDto: ShowtimeDto) => createShowtime(showTimeDto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["showtimes"] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, showTimeDto }: { id: string; showTimeDto: ShowtimeDto }) =>
            updateShowtime(id, showTimeDto),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["showtimes"] });
            queryClient.invalidateQueries({ queryKey: ["showtime", variables.id] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteShowtime(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["showtimes"] });
        },
    });

    return {
        createShowTime: createMutation,
        updateShowTime: updateMutation,
        deleteShowTime: deleteMutation,
    };
};