import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createTheater, deleteTheater, getAllTheaters, getTheaterById, updateTheater } from "../apis/theater"
import type { TheaterDto } from '../types/theater.types';

export const useTheaters = (params?: { page?: number; limit?: number }) => {
    return useQuery({
        queryKey: ['theaters', params],
        queryFn: async () => {
            const response = await getAllTheaters(params);
            return response;
        },
    });
};

export const useTheaterDetail = (id: string) => {
    return useQuery({
        queryKey: ['theater', id],
        queryFn: async () => {
            const response = await getTheaterById(id);
            return response.data;
        },
        enabled: !!id,
    });
};

export const useTheaterMutations = () => {
    const queryClient = useQueryClient();
    const createMutation = useMutation({
        mutationFn: (theaterDto: TheaterDto | FormData) => createTheater(theaterDto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['theaters'] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, theaterDto }: { id: string; theaterDto: TheaterDto | FormData }) =>
            updateTheater(id, theaterDto),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['theaters'] });
            queryClient.invalidateQueries({ queryKey: ['theater', variables.id] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteTheater(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['theaters'] });
        },
    });

    return {
        createTheater: createMutation,
        updateTheater: updateMutation,
        deleteTheater: deleteMutation,
    };
};