import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie, } from '../apis/movie';
import { useMovieStore } from '../store/useMovieStore';
import type { MovieDto } from '../types/movie.types';

export const useMovies = (params?: { page?: number; limit?: number }) => {
    const { searchQuery, filterStatus } = useMovieStore();

    return useQuery({
        queryKey: ['movies', searchQuery, filterStatus, params?.page, params?.limit],
        queryFn: async () => {
            const response = await getAllMovies({
                ...params,
            });
            return response;
        },
    });
};

export const useMovieDetail = (id: string) => {
    return useQuery({
        queryKey: ['movie', id],
        queryFn: async () => {
            const response = await getMovieById(id);
            return response.data;
        },
        enabled: !!id,
    });
};

export const useMovieMutations = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (movieDto: MovieDto | FormData) => createMovie(movieDto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['movies'] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, movieDto }: { id: string; movieDto: MovieDto | FormData }) =>
            updateMovie(id, movieDto),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['movies'] });
            queryClient.invalidateQueries({ queryKey: ['movie', variables.id] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteMovie(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['movies'] });
        },
    });

    return {
        createMovie: createMutation,
        updateMovie: updateMutation,
        deleteMovie: deleteMutation,
    };
};
