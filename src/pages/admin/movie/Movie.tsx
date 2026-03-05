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
    release_date: z.string().min(1, 'Release date is required'),
    duration: z.coerce.number().min(1, 'Duration must be greater than 0'),
    genre: z.string().min(1, 'Genre is required'),
    director: z.string().min(1, 'Director is required'),
    actors: z.string().min(1, 'Actors are required'),
    rating: z.string().min(1, 'Rating is required'),
    language: z.string().min(1, 'Language is required'),
    image_url: z.string().url('Must be a valid URL'),
    video_url: z.string().url('Must be a valid URL'),
});

type MovieFormData = z.infer<typeof movieSchema>;

const Movie: React.FC = () => {
    const { searchQuery, filterStatus, setSearchQuery, setFilterStatus } = useMovieStore();
    const { data: movies, isLoading } = useMovies();
    const { createMovie, updateMovie, deleteMovie } = useMovieMutations();
    console.log(movies);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMovie, setEditingMovie] = useState<IMovie | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<MovieFormData>({
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
            release_date: '',
            duration: 120,
            genre: '',
            director: '',
            actors: '',
            rating: 'P',
            language: 'Tiếng Việt',
            image_url: '',
            video_url: '',
        });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (movie: IMovie) => {
        setEditingMovie(movie);
        reset({
            title: movie.title,
            description: movie.description,
            release_date: movie.release_date.split('T')[0],
            duration: movie.duration,
            director: movie.metadata.director,
            actors: movie.metadata.actors.join(', '),
            genre: movie.metadata.genre,
            rating: movie.metadata.rating,
            language: movie.metadata.language,
            image_url: movie.image_url,
            video_url: movie.video_url,
        });
        setIsModalOpen(true);
    };

    const onSubmit = (data: MovieFormData) => {
        const dto: MovieDto = {
            title: data.title,
            description: data.description,
            duration: data.duration,
            release_date: data.release_date,
            video_url: data.video_url,
            poster_url: data.image_url,
            metadata: {
                director: data.director,
                actors: data.actors.split(',').map(a => a.trim()),
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

    return (
        <div className="space-y-8 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Movie Management</h1>
                    <p className="text-slate-400 font-medium mt-1">Total {movies?.length || 0} movies found in your database</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-black transition-all shadow-lg shadow-indigo-600/20 active:scale-95 text-sm uppercase tracking-wider"
                >
                    <Plus size={20} strokeWidth={3} />
                    Add New Movie
                </button>
            </div>

            {/* Filters Section */}
            <div className="bg-white border border-slate-100 p-6 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row items-center gap-6">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search movies by title, director or cast..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-50 border-none text-slate-900 pl-12 pr-4 py-3 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all placeholder:text-slate-400 text-sm font-medium"
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400">
                        <Filter size={18} />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        className="bg-slate-50 border-none text-slate-900 px-5 py-3 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all cursor-pointer w-full md:w-56 appearance-none font-bold text-sm"
                    >
                        <option value="ALL">All Status</option>
                        <option value="NOW_SHOWING">Now Showing</option>
                        <option value="COMING_SOON">Coming Soon</option>
                        <option value="END_SHOWING">End Showing</option>
                    </select>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50">
                            <tr>
                                <th className="px-8 py-5">Movie details</th>
                                <th className="px-6 py-5">Genre</th>
                                <th className="px-6 py-5 text-center">Duration</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-8 py-8 h-24">
                                            <div className="flex gap-4 items-center">
                                                <div className="w-12 h-16 bg-slate-100 rounded-xl"></div>
                                                <div className="space-y-2 flex-1">
                                                    <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                                                    <div className="h-3 bg-slate-100 rounded w-1/6"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : movies?.map((movie: IMovie) => (
                                <tr key={movie.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-20 rounded-xl bg-slate-100 flex-shrink-0 bg-cover bg-center shadow-sm overflow-hidden"
                                                style={{ backgroundImage: `url(${movie.posterUrl})` }}>
                                                {!movie.posterUrl && <Film className="w-full h-full p-4 text-slate-300" />}
                                            </div>
                                            <div className="max-w-[300px]">
                                                <p className="font-black text-slate-900 truncate text-base leading-tight mb-1">{movie.title}</p>
                                                <div className="flex items-center gap-3">
                                                    <p className="text-[10px] font-bold text-slate-400 flex items-center bg-slate-100 px-2 py-0.5 rounded-lg">
                                                        <Calendar size={10} className="mr-1" />
                                                        {new Date(movie.release_date).toLocaleDateString()}
                                                    </p>
                                                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">Dir: {movie.metadata.director}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                                            <span className="text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-100 px-2.5 py-1 rounded-full uppercase tracking-tighter">
                                                {movie.metadata.genre}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <div className="inline-flex flex-col items-center">
                                            <span className="text-sm text-slate-700 font-black">{movie.duration}m</span>
                                            <div className="w-1 h-1 bg-indigo-200 rounded-full mt-1"></div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600`}>
                                            {movie.metadata.rating}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleOpenEdit(movie)}
                                                className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                                title="Edit Movie"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setMovieToDelete(movie.id);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
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
                                    <td colSpan={5} className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mb-6">
                                                <Film size={40} />
                                            </div>
                                            <p className="text-lg font-black text-slate-900 tracking-tight">No movies found</p>
                                            <p className="text-slate-400 text-sm font-medium mt-1">Try adjusting your search or filters</p>
                                            <button onClick={() => setSearchQuery('')} className="text-sm font-black text-indigo-600 uppercase tracking-widest mt-6 hover:underline">Clear all filters</button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination / Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing {movies?.length || 0} movies per page</p>
                <div className="flex items-center gap-3">
                    <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all disabled:opacity-30 shadow-sm">
                        <ChevronLeft size={20} />
                    </button>
                    <div className="flex items-center gap-2">
                        <button className="w-12 h-12 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-600/20">1</button>
                    </div>
                    <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all disabled:opacity-30 shadow-sm">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Movie Form Modal */}
            {isModalOpen && (
                <ModalCustom
                    onClose={() => setIsModalOpen(false)}
                    className="w-full max-w-4xl max-h-[90vh] !bg-white !text-slate-900 border-none rounded-[3rem] overflow-y-auto shadow-2xl"
                >
                    <div className="p-10">
                        <div className="flex items-center gap-5 mb-10 pb-6 border-b border-slate-100">
                            <div className="p-4 bg-indigo-50 rounded-[1.5rem] text-indigo-600">
                                {editingMovie ? <Edit size={28} strokeWidth={2.5} /> : <Plus size={28} strokeWidth={2.5} />}
                            </div>
                            <div>
                                <h2 className="text-3xl font-black tracking-tight">{editingMovie ? 'Edit Movie' : 'Add New Movie'}</h2>
                                <p className="text-slate-400 font-medium text-sm">Update information for this cinematic record.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Movie Title</label>
                                        <input
                                            {...register('title')}
                                            className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                            placeholder="Enter movie title"
                                        />
                                        {errors.title && <p className="text-xs text-rose-500 font-bold flex items-center gap-1.5 mt-1 ml-1"><AlertCircle size={14} /> {errors.title.message}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Release Date</label>
                                            <input
                                                type="date"
                                                {...register('release_date')}
                                                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                            />
                                            {errors.release_date && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{errors.release_date.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Duration (mins)</label>
                                            <input
                                                type="number"
                                                {...register('duration')}
                                                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                            />
                                            {errors.duration && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{errors.duration.message}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Director</label>
                                        <input
                                            {...register('director')}
                                            className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                            placeholder="Movie director"
                                        />
                                        {errors.director && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{errors.director.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Rating</label>
                                        <select
                                            {...register('rating')}
                                            className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all cursor-pointer font-bold text-sm appearance-none"
                                        >
                                            <option value="P">P - General</option>
                                            <option value="K">K - Kids</option>
                                            <option value="T13">T13 - 13+</option>
                                            <option value="T16">T16 - 16+</option>
                                            <option value="T18">T18 - 18+</option>
                                            <option value="C">C - Restricted</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Language</label>
                                        <input
                                            {...register('language')}
                                            className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                            placeholder="Tiếng Việt / Phụ đề Tiếng Anh"
                                        />
                                        {errors.language && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{errors.language.message}</p>}
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Genre (Comma separated)</label>
                                        <input
                                            {...register('genre')}
                                            className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                            placeholder="Action, Adventure, Sci-Fi"
                                        />
                                        {errors.genre && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{errors.genre.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Cast (Comma separated)</label>
                                        <input
                                            {...register('actors')}
                                            className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                            placeholder="Actor 1, Actor 2..."
                                        />
                                        {errors.actors && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{errors.actors.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Poster URL</label>
                                        <input
                                            {...register('image_url')}
                                            className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                            placeholder="https://example.com/poster.jpg"
                                        />
                                        {errors.image_url && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{errors.image_url.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Trailer URL</label>
                                        <input
                                            {...register('video_url')}
                                            className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                            placeholder="https://youtube.com/..."
                                        />
                                        {errors.video_url && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{errors.video_url.message}</p>}
                                    </div>
                                </div>

                                {/* Full Width Column */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Description</label>
                                    <textarea
                                        {...register('description')}
                                        rows={4}
                                        className="w-full bg-slate-50 border-none rounded-[1.5rem] px-6 py-4 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all resize-none font-bold text-sm"
                                        placeholder="Enter movie description..."
                                    />
                                    {errors.description && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{errors.description.message}</p>}
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-4 pt-8 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-8 py-3 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all font-black text-sm uppercase tracking-wider"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createMovie.isPending || updateMovie.isPending}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-3.5 rounded-2xl font-black transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm uppercase tracking-wider"
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
                <ModalCustom onClose={() => setIsDeleteModalOpen(false)} className="w-[450px] !bg-white !text-slate-900 border-none rounded-[2.5rem] shadow-2xl">
                    <div className="p-10 text-center">
                        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-rose-100/50">
                            <Trash2 size={36} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-2xl font-black mb-3 tracking-tight">Delete record?</h3>
                        <p className="text-slate-400 font-medium text-sm mb-10 leading-relaxed px-4">
                            This action will permanently delete this movie from the system. It cannot be recovered.
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-6 py-3.5 rounded-2xl bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all font-black flex-1 text-sm uppercase tracking-wider"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white transition-all font-black flex-1 shadow-lg shadow-rose-600/20 text-sm uppercase tracking-wider"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </ModalCustom>
            )}
        </div>
    );
};

export default Movie;