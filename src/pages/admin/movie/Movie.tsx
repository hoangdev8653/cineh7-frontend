import React, { useState } from 'react';
import { useMovies, useMovieMutations } from '../../../hooks/useMovie';
import { useMovieStore } from '../../../store/useMovieStore';
import type { IMovie, MovieDto } from '../../../types/movie.types';
import MovieHeader from './components/MovieHeader';
import MovieFilters from './components/MovieFilters';
import MovieTable from './components/MovieTable';
import MoviePagination from './components/MoviePagination';
import MovieFormModal from './components/MovieFormModal';
import DeleteMovieModal from './components/DeleteMovieModal';

const Movie: React.FC = () => {
    const { searchQuery, filterStatus, setSearchQuery, setFilterStatus } = useMovieStore();
    const { data: movies, isLoading } = useMovies();
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
        const dto: MovieDto = {
            title: data.title,
            description: data.description,
            duration: data.duration,
            releaseDate: data.release_date,
            trailer: data.video_url,
            poster_url: data.image_url,
            slug: editingMovie?.slug || data.title.toLowerCase().replace(/ /g, '-'),
            rating: Number(data.rating.replace(/\D/g, '')) || 10,
            comingSoon: editingMovie?.comingSoon || false,
            isShowing: editingMovie?.isShowing || true,
            metadata: {
                director: data.director,
                actors: data.actors.split(',').map((a: string) => a.trim()),
                genre: data.genre,
                rating: data.rating,
                language: data.language
            }
        };

        if (editingMovie) {
            updateMovie.mutate({ id: editingMovie.id, movieDto: dto }, {
                onSuccess: () => setIsModalOpen(false)
            });
        } else {
            createMovie.mutate(dto, {
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

    // Filtering logic (Search + Status)
    const filteredMovies = movies?.filter((movie: IMovie) => {
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
                totalMovies={movies?.length || 0}
                onAdd={handleOpenAdd}
            />

            <MovieFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filterStatus={filterStatus}
                onFilterStatusChange={setFilterStatus}
            />

            <MovieTable
                movies={filteredMovies}
                isLoading={isLoading}
                onEdit={handleOpenEdit}
                onDelete={(id) => {
                    setMovieToDelete(id);
                    setIsDeleteModalOpen(true);
                }}
            />

            <MoviePagination totalMovies={filteredMovies?.length || 0} />

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