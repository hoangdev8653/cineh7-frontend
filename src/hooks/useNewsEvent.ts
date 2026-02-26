import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewsEvent, deleteNewsEvent, getAllNewsEvents, getNewsEventById, updateNewsEvent } from "../apis/news-event"
import type { NewsEventDto } from '../types/news-event.types';

export const useNewsEvents = () => {
    return useQuery({
        queryKey: ['news-events'],
        queryFn: async () => {
            const response = await getAllNewsEvents();
            return response.data;
        },
    });
};

export const useNewsEventDetail = (id: string) => {
    return useQuery({
        queryKey: ['news-event', id],
        queryFn: async () => {
            const response = await getNewsEventById(id);
            return response.data;
        },
        enabled: !!id,
    });
};

export const useNewsEventMutations = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (newsEventDto: NewsEventDto) => createNewsEvent(newsEventDto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news-events'] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, newsEventDto }: { id: string; newsEventDto: NewsEventDto }) =>
            updateNewsEvent(id, newsEventDto),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['news-events'] });
            queryClient.invalidateQueries({ queryKey: ['news-event', variables.id] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteNewsEvent(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news-events'] });
        },
    });

    return {
        createNewsEvent: createMutation,
        updateNewsEvent: updateMutation,
        deleteNewsEvent: deleteMutation,
    };
};