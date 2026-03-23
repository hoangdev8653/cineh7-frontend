import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllShowtimes, getShowtimeGrouped, createShowtime, deleteShowtime, getShowtimeById, updateShowtime, getShowtimeByMovieId } from "../apis/showtime"
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



export const useShowtimeByMovieId = (movieId: string) => {
    return useQuery({
        queryKey: ["showtime-by-movieid", movieId],
        queryFn: async () => {
            const response = await getShowtimeByMovieId(movieId);
            return response.data;
        },
        enabled: !!movieId,
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

export const useShowTimeGrouped = (movieId: string) => {
    return useQuery({
        queryKey: ["showtime-grouped", movieId],
        queryFn: async () => {
            const response = await getShowtimeGrouped(movieId);
            return response.data;
        },
        enabled: !!movieId,
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