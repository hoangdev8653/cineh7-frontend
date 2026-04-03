import React, { useState, useEffect } from 'react';
import { useMovies, useMovieMutations } from '../../../hooks/useMovie';
import { useMovieStore } from '../../../store/useMovieStore';
import type { IMovie } from '../../../types/movie.types';
import MovieHeader from './MovieHeader';
import MovieFilters from './MovieFilters';
import MovieTable from './MovieTable';
import MoviePagination from './MoviePagination';
import MovieFormModal from './MovieFormModal';
import DeleteMovieModal from './DeleteMovieModal';

const Movie: React.FC = () => {
    const { searchQuery, filterStatus, setSearchQuery, setFilterStatus } = useMovieStore();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        setPage(1);
    }, [searchQuery, filterStatus]);
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



    return (
        <div className="space-y-8 pb-10">
            <MovieHeader
                totalMovies={movies?.data?.total || 0}
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
                totalMovies={movies?.data?.total || 0}
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