import { z } from 'zod';
import { movieSchema } from '../schema/movie';

export interface MovieMetadata {
    director: string;
    actors: string[];
    rating: string;
    genre: string;
    language: string;
}

export interface IMovie {
    id: string;
    title: string;
    slug: string;
    trailer: string;
    description: string;
    releaseDate: string;
    rating: number;
    duration: number;
    poster?: string;
    comingSoon: boolean;
    isShowing: boolean;
    created_at: string;
    updated_at?: string;
    metadata?: MovieMetadata;
}

export interface MovieDto {
    title: string;
    slug: string;
    trailer: File | string;
    description: string;
    releaseDate: string;
    rating: number;
    duration: number;
    poster: File | string;
    comingSoon: boolean;
    isShowing: boolean;
}

export interface DeleteMovieModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isPending: boolean;
}

export interface MovieHeaderProps {
    totalMovies: number;
    onAdd: () => void;
}

export interface MoviePaginationProps {
    totalMovies: number;
    page: number;
    limit: number;
    onPageChange: (page: number) => void;
}

export interface MovieTableProps {
    movies: any;
    isLoading: boolean;
    onEdit: (movie: IMovie) => void;
    onDelete: (id: string) => void;
}

export interface ReviewFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    movieId: string;
    movieTitle: string;
}

export interface MovieFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    filterStatus: 'ALL' | 'NOW_SHOWING' | 'COMING_SOON' | 'END_SHOWING';
    onFilterStatusChange: (value: 'ALL' | 'NOW_SHOWING' | 'COMING_SOON' | 'END_SHOWING') => void;
}

export type MovieFormData = z.infer<typeof movieSchema>;

export interface MovieFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: MovieFormData) => void;
    editingMovie: IMovie | null;
    isPending: boolean;
}

