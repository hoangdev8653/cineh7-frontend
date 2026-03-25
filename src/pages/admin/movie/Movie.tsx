import React, { useState } from 'react';
import { useMovies, useMovieMutations } from '../../../hooks/useMovie';
import { useMovieStore } from '../../../store/useMovieStore';
import type { IMovie } from '../../../types/movie.types';
import MovieHeader from './components/MovieHeader';
import MovieFilters from './components/MovieFilters';
import MovieTable from './components/MovieTable';
import MoviePagination from './components/MoviePagination';
import MovieFormModal from './components/MovieFormModal';
import DeleteMovieModal from './components/DeleteMovieModal';

const Movie: React.FC = () => {
    const { searchQuery, filterStatus, setSearchQuery, setFilterStatus } = useMovieStore();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data: movies, isLoading } = useMovies({ page, limit });
    const { createMovie, updateMovie, deleteMovie } = useMovieMutations();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMovie, setEditingMovie] = useState<IMovie | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState<string | null>(null);

    const handleOpenAdd = () => {
        setEditingMovie(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (movie: IMovie) => {
        setEditingMovie(movie);
        setIsModalOpen(true);
    };

    const handleFormSubmit = (data: any) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('slug', data.slug);
        formData.append('description', data.description);
        formData.append('releaseDate', data.releaseDate);
        formData.append('rating', data.rating.toString());
        formData.append('duration', data.duration.toString());
        formData.append('comingSoon', data.comingSoon.toString());
        formData.append('isShowing', data.isShowing.toString());

        if (data.poster?.[0]) {
            formData.append('poster', data.poster[0]);
        }
        if (data.trailer?.[0]) {
            formData.append('trailer', data.trailer[0]);
        }

        if (editingMovie) {
            updateMovie.mutate({ id: editingMovie.id, movieDto: formData }, {
                onSuccess: () => setIsModalOpen(false)
            });
        } else {
            createMovie.mutate(formData, {
                onSuccess: () => setIsModalOpen(false)
            });
        }
    };

    const handleDelete = () => {
        if (movieToDelete) {
            deleteMovie.mutate(movieToDelete, {
                onSuccess: () => setIsDeleteModalOpen(false)
            });
        }
    };

    const filteredMovies = movies?.data?.movie?.filter((movie: IMovie) => {
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.metadata?.director?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.metadata?.actors?.some(actor => actor.toLowerCase().includes(searchQuery.toLowerCase()));

        let matchesStatus = true;
        if (filterStatus === 'NOW_SHOWING') matchesStatus = movie.isShowing;
        else if (filterStatus === 'COMING_SOON') matchesStatus = movie.comingSoon;
        else if (filterStatus === 'END_SHOWING') matchesStatus = !movie.isShowing && !movie.comingSoon;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-8 pb-10">
            <MovieHeader
                totalMovies={movies?.data?.movie?.length || 0}
                onAdd={handleOpenAdd}
            />

            <MovieFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filterStatus={filterStatus}
                onFilterStatusChange={setFilterStatus}
            />

            <MovieTable
                movies={movies}
                isLoading={isLoading}
                onEdit={handleOpenEdit}
                onDelete={(id) => {
                    setMovieToDelete(id);
                    setIsDeleteModalOpen(true);
                }}
            />

            <MoviePagination
                totalMovies={movies?.data?.total || movies?.data?.movie?.length || 0}
                page={page}
                limit={limit}
                onPageChange={setPage}
            />

            {isModalOpen && (
                <MovieFormModal
                    key={editingMovie?.id || 'new-movie'}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleFormSubmit}
                    editingMovie={editingMovie}
                    isPending={createMovie.isPending || updateMovie.isPending}
                />
            )}

            <DeleteMovieModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                isPending={deleteMovie.isPending}
            />
        </div>
    );
};

export default Movie;