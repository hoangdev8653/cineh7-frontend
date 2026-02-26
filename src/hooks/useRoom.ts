import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createRoom, deleteRoom, getAllRooms, getRoomById, updateRoom } from "../apis/room"
import type { RoomDto } from '../types/room.types';

export const useRooms = () => {
    return useQuery({
        queryKey: ['rooms'],
        queryFn: async () => {
            const response = await getAllRooms();
            return response.data;
        },
    });
};

export const useRoomDetail = (id: string) => {
    return useQuery({
        queryKey: ['room', id],
        queryFn: async () => {
            const response = await getRoomById(id);
            return response.data;
        },
        enabled: !!id,
    });
};

export const useRoomMutations = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (roomDto: RoomDto) => createRoom(roomDto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rooms'] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, roomDto }: { id: string; roomDto: RoomDto }) =>
            updateRoom(id, roomDto),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['rooms'] });
            queryClient.invalidateQueries({ queryKey: ['room', variables.id] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteRoom(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rooms'] });
        },
    });

    return {
        createRoom: createMutation,
        updateRoom: updateMutation,
        deleteRoom: deleteMutation,
    };
};