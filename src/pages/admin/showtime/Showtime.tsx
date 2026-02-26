import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Plus,
    Edit,
    Trash2,
    Calendar,
    Clock,
    Monitor,
    Ticket,
    AlertCircle,
    Film,
    ChevronLeft,
    ChevronRight,
    MapPin
} from 'lucide-react';
import { useShowTimes, useShowTimeMutations } from '../../../hooks/useShowTime';
import { useMovies } from '../../../hooks/useMovie';
import { useRooms } from '../../../hooks/useRoom';
import type { IShowtime, ShowtimeDto } from '../../../types/showtime.types';
import type { IMovie } from '../../../types/movie.types';
import type { IRoom } from '../../../types/room.types';
import ModalCustom from '../../../components/common/Modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const showtimeSchema = z.object({
    movieId: z.string().min(1, 'Movie selection is required'),
    roomId: z.string().min(1, 'Room selection is required'),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
    price: z.coerce.number().min(0, 'Price must be 0 or greater'),
});

type ShowtimeFormData = z.infer<typeof showtimeSchema>;

const Showtime: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: showtimes, isLoading: isLoadingShowtimes } = useShowTimes();
    const { data: movies } = useMovies();
    const { data: rooms } = useRooms();
    const { createShowTime, updateShowTime, deleteShowTime } = useShowTimeMutations();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingShowtime, setEditingShowtime] = useState<IShowtime | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [showtimeToDelete, setShowtimeToDelete] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ShowtimeFormData>({
        resolver: zodResolver(showtimeSchema),
    });

    const moviesMap = (movies || []).reduce((acc: any, movie: IMovie) => {
        acc[movie.id] = movie;
        return acc;
    }, {});

    const roomsMap = (rooms || []).reduce((acc: any, room: IRoom) => {
        acc[room.id] = room;
        return acc;
    }, {});

    const filteredShowtimes = showtimes?.filter((s: IShowtime) => {
        const movie = moviesMap[s.movieId];
        const searchLower = searchQuery.toLowerCase();
        return (
            movie?.title.toLowerCase().includes(searchLower) ||
            s.startTime.includes(searchLower)
        );
    });

    const handleOpenAdd = () => {
        setEditingShowtime(null);
        reset({
            movieId: '',
            roomId: '',
            startTime: '',
            endTime: '',
            price: 100000,
        });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (showtime: IShowtime) => {
        setEditingShowtime(showtime);
        reset(showtime);
        setIsModalOpen(true);
    };

    const onSubmit = (data: ShowtimeFormData) => {
        if (editingShowtime) {
            updateShowTime.mutate({ id: editingShowtime.id, showTimeDto: data }, {
                onSuccess: () => setIsModalOpen(false)
            });
        } else {
            createShowTime.mutate(data, {
                onSuccess: () => setIsModalOpen(false)
            });
        }
    };

    const handleDelete = () => {
        if (showtimeToDelete) {
            deleteShowTime.mutate(showtimeToDelete, {
                onSuccess: () => setIsDeleteModalOpen(false)
            });
        }
    };

    const formatDateTime = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            return {
                date: date.toLocaleDateString(),
                time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
        } catch (e) {
            return { date: dateStr, time: '' };
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white uppercase tracking-tight">Showtime Management</h1>
                    <p className="text-gray-400">Schedule and manage movie screenings</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95 text-sm"
                >
                    <Plus size={18} />
                    Add New Showtime
                </button>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700 p-4 rounded-2xl flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search by movie title or date (YYYY-MM-DD)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white pl-12 pr-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600 text-sm"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-gray-800 border border-gray-700 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-900/60 text-gray-500 text-[10px] uppercase font-black tracking-[0.2em] border-b border-gray-700/50">
                            <tr>
                                <th className="px-8 py-5">Movie & Room</th>
                                <th className="px-8 py-5">Schedule</th>
                                <th className="px-8 py-5">Pricing</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/30">
                            {isLoadingShowtimes ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={4} className="px-8 py-10 bg-gray-800/10 h-24"></td>
                                    </tr>
                                ))
                            ) : filteredShowtimes?.map((showtime: IShowtime) => {
                                const movie = moviesMap[showtime.movieId];
                                const room = roomsMap[showtime.roomId];
                                const start = formatDateTime(showtime.startTime);
                                const end = formatDateTime(showtime.endTime);

                                return (
                                    <tr key={showtime.id} className="hover:bg-gray-700/20 transition-all group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-16 rounded-xl bg-gray-700 flex-shrink-0 bg-cover bg-center border border-gray-600"
                                                    style={{ backgroundImage: `url(${movie?.posterUrl})` }}>
                                                    {!movie?.posterUrl && <Film className="w-full h-full p-3 text-gray-500" />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-200 group-hover:text-white transition-colors">{movie?.title || 'Unknown Movie'}</p>
                                                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                                        <Monitor size={12} className="text-blue-500 opacity-70" />
                                                        <span>{room?.name || 'Room Not Set'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                                                    <Clock size={14} className="text-emerald-500" />
                                                    <span>{start.time}</span>
                                                    <span className="text-gray-600">→</span>
                                                    <span>{end.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-500 text-xs">
                                                    <Calendar size={12} />
                                                    <span>{start.date}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-amber-500 font-bold">
                                                <Ticket size={16} />
                                                <span>{showtime.price.toLocaleString()} VNĐ</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleOpenEdit(showtime)}
                                                    className="p-2.5 bg-gray-900/50 hover:bg-blue-600 hover:text-white text-blue-400 border border-gray-700 rounded-xl transition-all"
                                                    title="Edit Showtime"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setShowtimeToDelete(showtime.id);
                                                        setIsDeleteModalOpen(true);
                                                    }}
                                                    className="p-2.5 bg-gray-900/50 hover:bg-rose-600 hover:text-white text-rose-500 border border-gray-700 rounded-xl transition-all"
                                                    title="Delete Showtime"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {!isLoadingShowtimes && filteredShowtimes?.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center opacity-30">
                                            <Clock size={48} className="mb-4" />
                                            <p className="text-lg font-bold">No showtimes found</p>
                                            <p className="text-sm">Try searching for another movie or date</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-2 text-gray-500 text-[10px] uppercase font-black tracking-widest">
                <span>Displaying {filteredShowtimes?.length || 0} screenings</span>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:text-white transition-colors opacity-30 cursor-not-allowed"><ChevronLeft size={18} /></button>
                    <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">1</span>
                    <button className="p-2 hover:text-white transition-colors opacity-30 cursor-not-allowed"><ChevronRight size={18} /></button>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <ModalCustom
                    onClose={() => setIsModalOpen(false)}
                    className="w-full max-w-2xl !bg-gray-800 !text-white border border-gray-700 shadow-2xl"
                >
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
                                {editingShowtime ? <Edit size={24} /> : <Plus size={24} />}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{editingShowtime ? 'Edit Screening' : 'Schedule Screening'}</h2>
                                <p className="text-gray-400 text-xs">Configure movie, room, and timing details</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 font-sans">Target Movie</label>
                                    <select
                                        {...register('movieId')}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">Select a movie</option>
                                        {movies?.map((m: IMovie) => (
                                            <option key={m.id} value={m.id}>{m.title}</option>
                                        ))}
                                    </select>
                                    {errors.movieId && <p className="text-xs text-rose-500 flex items-center gap-1 mt-1"><AlertCircle size={12} /> {errors.movieId.message}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 font-sans">Cinema Room</label>
                                    <select
                                        {...register('roomId')}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">Select a room</option>
                                        {rooms?.map((r: IRoom) => (
                                            <option key={r.id} value={r.id}>{r.name}</option>
                                        ))}
                                    </select>
                                    {errors.roomId && <p className="text-xs text-rose-500 flex items-center gap-1 mt-1"><AlertCircle size={12} /> {errors.roomId.message}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 font-sans">Start Time</label>
                                    <input
                                        type="datetime-local"
                                        {...register('startTime')}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                    />
                                    {errors.startTime && <p className="text-xs text-rose-500 mt-1">{errors.startTime.message}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 font-sans">End Time</label>
                                    <input
                                        type="datetime-local"
                                        {...register('endTime')}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                    />
                                    {errors.endTime && <p className="text-xs text-rose-500 mt-1">{errors.endTime.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 font-sans">Ticket Price (VNĐ)</label>
                                <div className="relative">
                                    <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                    <input
                                        type="number"
                                        {...register('price')}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-amber-500"
                                        placeholder="100,000"
                                    />
                                </div>
                                {errors.price && <p className="text-xs text-rose-500 mt-1">{errors.price.message}</p>}
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-700">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2.5 text-gray-500 hover:text-white font-bold transition-all text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createShowTime.isPending || updateShowTime.isPending}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-2.5 rounded-xl font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 text-xs flex items-center gap-2"
                                >
                                    {(createShowTime.isPending || updateShowTime.isPending) && (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    )}
                                    {editingShowtime ? 'Update Showtime' : 'Schedule Now'}
                                </button>
                            </div>
                        </form>
                    </div>
                </ModalCustom>
            )}

            {/* Delete Confirmation */}
            {isDeleteModalOpen && (
                <ModalCustom onClose={() => setIsDeleteModalOpen(false)} className="w-full max-w-sm !bg-gray-800 !text-white border border-gray-700 p-8 text-center shadow-2xl">
                    <div className="w-16 h-16 bg-rose-900/30 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-rose-800/50">
                        <Trash2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Delete Schedule?</h3>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                        Are you sure you want to remove this screening session? This will affect any existing bookings associated with it.
                    </p>
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={handleDelete}
                            className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-rose-900/20"
                        >
                            Confirm Deletion
                        </button>
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="w-full py-3 text-gray-500 hover:text-white font-bold transition-all mt-1"
                        >
                            Go Back
                        </button>
                    </div>
                </ModalCustom>
            )}
        </div>
    );
};

export default Showtime;
