import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../apis/user';
import type { IUser } from '../types/auth.types';

export const useUsers = (searchQuery?: string) => {
    return useQuery({
        queryKey: ['users', searchQuery],
        queryFn: async () => {
            const response = await getAllUsers();
            let users = response.data;

            if (searchQuery) {
                users = users.filter((u: IUser) =>
                    u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    u.email.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }
            return users;
        },
    });
};

export const useUserDetail = (id: string) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            const response = await getUserById(id);
            return response.data;
        },
        enabled: !!id,
    });
};

export const useUserMutations = () => {
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: ({ id, userDto }: { id: string; userDto: Partial<IUser> }) =>
            updateUser(id, userDto),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    return {
        updateUser: updateMutation,
        deleteUser: deleteMutation,
    };
};
