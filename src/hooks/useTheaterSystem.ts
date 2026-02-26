import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllTheaterSystems, createTheaterSystem, deleteTheaterSystem, getTheaterSystemById, updateTheaterSystem } from "../apis/theater-system"
import type { TheaterSystemDto } from '../types/theater-system.type';

export const useTheaterSystems = () => {
    return useQuery({
        queryKey: ['theater-systems'],
        queryFn: async () => {
            const response = await getAllTheaterSystems();
            return response.data;
        },
    });
};

export const useTheaterSystemDetail = (id: string) => {
    return useQuery({
        queryKey: ['theater-system', id],
        queryFn: async () => {
            const response = await getTheaterSystemById(id);
            return response.data;
        },
        enabled: !!id,
    });
};

export const useTheaterSystemMutations = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (theaterSystemDto: TheaterSystemDto) => createTheaterSystem(theaterSystemDto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['theater-system'] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, theaterSystemDto }: { id: string; theaterSystemDto: TheaterSystemDto }) =>
            updateTheaterSystem(id, theaterSystemDto),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['theater-systems'] });
            queryClient.invalidateQueries({ queryKey: ['theater-system', variables.id] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteTheaterSystem(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['theater-system'] });
        },
    });

    return {
        createTheaterSystem: createMutation,
        updateTheaterSystem: updateMutation,
        deleteTheaterSystem: deleteMutation,
    };
};