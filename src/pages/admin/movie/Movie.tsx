import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    Plus,
    Edit,
    Trash2,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    Film,
    Calendar,
    Clock,
    Tag,
    AlertCircle
} from 'lucide-react';
import { useMovies, useMovieMutations } from '../../../hooks/useMovie';
import { useMovieStore } from '../../../store/useMovieStore';
import type { IMovie, MovieDto } from '../../../types/movie.types';
import ModalCustom from '../../../components/common/Modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Form Validation Schema
const movieSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    releaseDate: z.string().min(1, 'Release date is required'),
    duration: z.coerce.number().min(1, 'Duration must be greater than 0'),
    genre: z.string().transform(str => str.split(',').map(s => s.trim())),
    director: z.string().min(1, 'Director is required'),
    cast: z.string().transform(str => str.split(',').map(s => s.trim())),
    posterUrl: z.string().url('Must be a valid URL'),
    trailerUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    status: z.enum(['NOW_SHOWING', 'COMING_SOON', 'END_SHOWING']),
});

type MovieFormData = z.infer<typeof movieSchema>;

const Movie: React.FC = () => {
    const { searchQuery, filterStatus, setSearchQuery, setFilterStatus } = useMovieStore();
    const { data: movies, isLoading } = useMovies();
    const { createMovie, updateMovie, deleteMovie } = useMovieMutations();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMovie, setEditingMovie] = useState<IMovie | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<MovieFormData>({
        resolver: zodResolver(movieSchema),
        defaultValues: {
            status: 'NOW_SHOWING',
            duration: 120
        }
    });

    const handleOpenAdd = () => {
        setEditingMovie(null);
        reset({
            title: '',
            description: '',
            releaseDate: '',
            duration: 120,
            genre: [] as any,
            director: '',
            cast: [] as any,
            posterUrl: '',
            trailerUrl: '',
            status: 'NOW_SHOWING',
        });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (movie: IMovie) => {
        setEditingMovie(movie);
        reset({
            ...movie,
            genre: movie.genre.join(', ') as any,
            cast: movie.cast.join(', ') as any,
        });
        setIsModalOpen(true);
    };

    const onSubmit = (data: MovieFormData) => {
        const dto: MovieDto = {
            ...data,
            trailerUrl: data.trailerUrl || undefined
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

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Movie Management</h1>
                    <p className="text-gray-400">Total {movies?.length || 0} movies found</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-900/20 active:scale-95"
                >
                    <Plus size={20} />
                    Add New Movie
                </button>
            </div>

            {/* Filters Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-4 rounded-2xl flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search by title, director..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white pl-10 pr-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter className="text-gray-500" size={18} />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        className="bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer w-full md:w-48 appearance-none"
                    >
                        <option value="ALL">All Status</option>
                        <option value="NOW_SHOWING">Now Showing</option>
                        <option value="COMING_SOON">Coming Soon</option>
                        <option value="END_SHOWING">End Showing</option>
                    </select>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-widest border-b border-gray-700">
                            <tr>
                                <th className="px-6 py-4 font-bold">Movie info</th>
                                <th className="px-6 py-4 font-bold">Genre</th>
                                <th className="px-6 py-4 font-bold text-center">Duration</th>
                                <th className="px-6 py-4 font-bold">Status</th>
                                <th className="px-6 py-4 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/50">
                            {isLoading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-6 py-6 border-b border-gray-700/30 bg-gray-800/20 h-20"></td>
                                    </tr>
                                ))
                            ) : movies?.map((movie: IMovie) => (
                                <tr key={movie.id} className="hover:bg-gray-700/20 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-16 rounded-lg bg-gray-700 flex-shrink-0 bg-cover bg-center shadow-md overflow-hidden"
                                                style={{ backgroundImage: `url(${movie.posterUrl})` }}>
                                                {!movie.posterUrl && <Film className="w-full h-full p-3 text-gray-500" />}
                                            </div>
                                            <div className="max-w-[250px]">
                                                <p className="font-bold text-gray-200 truncate">{movie.title}</p>
                                                <p className="text-xs text-gray-500 flex items-center mt-1">
                                                    <Calendar size={12} className="mr-1" />
                                                    {movie.releaseDate}
                                                </p>
                                                <p className="text-xs text-blue-400 mt-0.5 truncate italic">Dir: {movie.director}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                                            {movie.genre.slice(0, 3).map(g => (
                                                <span key={g} className="text-[10px] bg-gray-900 border border-gray-700 text-gray-400 px-2 py-0.5 rounded-full">
                                                    {g}
                                                </span>
                                            ))}
                                            {movie.genre.length > 3 && (
                                                <span className="text-[10px] text-gray-500">+{movie.genre.length - 3}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="text-sm text-gray-300 font-medium">{movie.duration}m</span>
                                            <Clock size={14} className="text-gray-600 mt-1" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${movie.status === 'NOW_SHOWING' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800/50' :
                                                movie.status === 'COMING_SOON' ? 'bg-amber-900/30 text-amber-500 border-amber-800/50' :
                                                    'bg-rose-900/30 text-rose-500 border-rose-800/50'
                                            }`}>
                                            {movie.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenEdit(movie)}
                                                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-all"
                                                title="Edit Movie"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setMovieToDelete(movie.id);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-900/20 rounded-lg transition-all"
                                                title="Delete Movie"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!isLoading && movies?.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center opacity-40">
                                            <Film size={48} className="mb-4" />
                                            <p className="text-lg font-medium">No movies found matching your criteria</p>
                                            <button onClick={() => setSearchQuery('')} className="text-blue-400 hover:underline mt-2">Clear search</button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination / Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 px-2">
                <p className="text-sm text-gray-500 italic">Showing {movies?.length || 0} items per page</p>
                <div className="flex items-center gap-2">
                    <button className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed">
                        <ChevronLeft size={20} />
                    </button>
                    <div className="flex items-center gap-1">
                        <button className="w-10 h-10 bg-blue-600 text-white rounded-lg font-bold">1</button>
                    </div>
                    <button className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Movie Form Modal */}
            {isModalOpen && (
                <ModalCustom
                    onClose={() => setIsModalOpen(false)}
                    className="w-full max-w-4xl max-h-[90vh] !bg-gray-800 !text-white border border-gray-700 overflow-y-auto"
                >
                    <div className="p-8">
                        <div className="flex items-center gap-3 mb-8 border-b border-gray-700 pb-4">
                            <div className="p-3 bg-blue-600/20 rounded-xl text-blue-500">
                                {editingMovie ? <Edit size={24} /> : <Plus size={24} />}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{editingMovie ? 'Edit Movie' : 'Add New Movie'}</h2>
                                <p className="text-gray-400 text-sm">Fill in the information below to {editingMovie ? 'update' : 'create'} the movie record.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Movie Title</label>
                                        <input
                                            {...register('title')}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            placeholder="Enter movie title"
                                        />
                                        {errors.title && <p className="text-xs text-rose-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.title.message}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Release Date</label>
                                            <input
                                                type="date"
                                                {...register('releaseDate')}
                                                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            />
                                            {errors.releaseDate && <p className="text-xs text-rose-500">{errors.releaseDate.message}</p>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Duration (mins)</label>
                                            <input
                                                type="number"
                                                {...register('duration')}
                                                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            />
                                            {errors.duration && <p className="text-xs text-rose-500">{errors.duration.message}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Director</label>
                                        <input
                                            {...register('director')}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            placeholder="Movie director"
                                        />
                                        {errors.director && <p className="text-xs text-rose-500">{errors.director.message}</p>}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Status</label>
                                        <select
                                            {...register('status')}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer appearance-none"
                                        >
                                            <option value="NOW_SHOWING">Now Showing</option>
                                            <option value="COMING_SOON">Coming Soon</option>
                                            <option value="END_SHOWING">End Showing</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Genre (Comma separated)</label>
                                        <input
                                            {...register('genre')}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            placeholder="Action, Adventure, Sci-Fi"
                                        />
                                        {errors.genre && <p className="text-xs text-rose-500">{errors.genre.message}</p>}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Cast (Comma separated)</label>
                                        <input
                                            {...register('cast')}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            placeholder="Actor 1, Actor 2..."
                                        />
                                        {errors.cast && <p className="text-xs text-rose-500">{errors.cast.message}</p>}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Poster URL</label>
                                        <input
                                            {...register('posterUrl')}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            placeholder="https://example.com/poster.jpg"
                                        />
                                        {errors.posterUrl && <p className="text-xs text-rose-500">{errors.posterUrl.message}</p>}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Trailer URL (Optional)</label>
                                        <input
                                            {...register('trailerUrl')}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            placeholder="https://youtube.com/..."
                                        />
                                        {errors.trailerUrl && <p className="text-xs text-rose-500">{errors.trailerUrl.message}</p>}
                                    </div>
                                </div>

                                {/* Full Width Column */}
                                <div className="md:col-span-2 space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Description</label>
                                    <textarea
                                        {...register('description')}
                                        rows={4}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                                        placeholder="Enter movie description..."
                                    />
                                    {errors.description && <p className="text-xs text-rose-500">{errors.description.message}</p>}
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-700">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700 transition-all font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createMovie.isPending || updateMovie.isPending}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {(createMovie.isPending || updateMovie.isPending) && (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    )}
                                    {editingMovie ? 'Update Movie' : 'Save Movie'}
                                </button>
                            </div>
                        </form>
                    </div>
                </ModalCustom>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <ModalCustom onClose={() => setIsDeleteModalOpen(false)} className="w-[400px] !bg-gray-800 !text-white border border-gray-700">
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-rose-900/40 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-rose-800/50">
                            <Trash2 size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Are you absolutely sure?</h3>
                        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                            This action will permanently delete the movie from the database. This process cannot be undone.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-6 py-2.5 rounded-xl bg-gray-700 text-gray-200 hover:bg-gray-600 transition-all font-semibold flex-1"
                            >
                                No, Keep it
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition-all font-bold flex-1 shadow-lg shadow-rose-900/20"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </ModalCustom>
            )}
        </div>
    );
};

export default Movie;