import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from "../apis/event"
import type { EventDto } from '../types/event.types';

export const useEvents = () => {
    return useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const response = await getAllEvents();
            return response?.data?.events;
        },
    });
};

export const useEventDetail = (id: string) => {
    return useQuery({
        queryKey: ['event', id],
        queryFn: async () => {
            const response = await getEventById(id);
            return response?.data;
        },
        enabled: !!id,
    });
};

export const useEventMutations = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (eventDto: EventDto | FormData) => createEvent(eventDto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, eventDto }: { id: string; eventDto: EventDto | FormData }) =>
            updateEvent(id, eventDto),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
            queryClient.invalidateQueries({ queryKey: ['event', variables.id] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteEvent(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
    });

    return {
        createEvent: createMutation,
        updateEvent: updateMutation,
        deleteEvent: deleteMutation,
    };
};