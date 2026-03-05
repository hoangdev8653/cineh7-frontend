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
    movie_id: z.string().min(1, 'Movie selection is required'),
    room_id: z.string().min(1, 'Room selection is required'),
    start_time: z.string().min(1, 'Start time is required'),
    end_time: z.string().min(1, 'End time is required'),
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

    const filteredShowtimes = showtimes?.filter((s: IShowtime) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            s.movie?.title.toLowerCase().includes(searchLower) ||
            s.start_time.includes(searchLower)
        );
    });

    const handleOpenAdd = () => {
        setEditingShowtime(null);
        reset({
            movie_id: '',
            room_id: '',
            start_time: '',
            end_time: '',
            price: 100000,
        });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (showtime: IShowtime) => {
        setEditingShowtime(showtime);
        reset({
            movie_id: showtime.movie_id,
            room_id: showtime.room_id,
            start_time: showtime.start_time.slice(0, 16),
            end_time: showtime.end_time.slice(0, 16),
            price: Number(showtime.price),
        });
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
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Showtime Management</h1>
                    <p className="text-slate-400 font-medium mt-1">Schedule and manage movie screenings across all facilities</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3.5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20 active:scale-95 text-xs"
                >
                    <Plus size={18} strokeWidth={3} />
                    Schedule Screening
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white border border-slate-100 p-2 rounded-[2rem] shadow-sm flex items-center pr-4">
                <div className="relative flex-1">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by movie title or date (YYYY-MM-DD)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent text-slate-900 pl-16 pr-6 py-4 rounded-xl outline-none transition-all placeholder:text-slate-400 font-medium"
                    />
                </div>
                <div className="h-10 w-[1px] bg-slate-100 mx-2 hidden md:block"></div>
                <div className="hidden md:flex items-center gap-3 px-4">
                    <Clock size={18} className="text-indigo-600" />
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Schedule</span>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50">
                            <tr>
                                <th className="px-8 py-6">Movie & Environment</th>
                                <th className="px-8 py-6">Screening Schedule</th>
                                <th className="px-8 py-6">Pricing Protocol</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoadingShowtimes ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={4} className="px-8 py-10">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-16 bg-slate-100 rounded-2xl"></div>
                                                <div className="space-y-2 flex-1">
                                                    <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                                                    <div className="h-3 bg-slate-200 rounded w-1/3"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : filteredShowtimes?.map((showtime: IShowtime) => {
                                const movie = showtime.movie;
                                const room = showtime.room;
                                const start = formatDateTime(showtime.start_time);
                                const end = formatDateTime(showtime.end_time);

                                return (
                                    <tr key={showtime.id} className="hover:bg-slate-50 transition-all group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-16 rounded-2xl bg-slate-100 flex-shrink-0 bg-cover bg-center border border-slate-200 shadow-sm"
                                                    style={{ backgroundImage: `url(${movie?.image_url})` }}>
                                                    {!movie?.image_url && <Film className="w-full h-full p-4 text-slate-300" />}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{movie?.title || 'Unknown Movie'}</p>
                                                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-bold uppercase tracking-wider">
                                                        <Monitor size={12} strokeWidth={3} className="text-indigo-500" />
                                                        <span>{room?.name || 'Room Not Set'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-2 text-slate-900 text-sm font-black">
                                                    <div className="p-1 rounded bg-emerald-50 text-emerald-600">
                                                        <Clock size={12} strokeWidth={3} />
                                                    </div>
                                                    <span>{start.time}</span>
                                                    <span className="text-slate-300 mx-0.5">/</span>
                                                    <span className="text-slate-400">{end.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-tight">
                                                    <Calendar size={12} strokeWidth={2.5} className="text-indigo-400" />
                                                    <span>{start.date}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-amber-600 font-black text-lg">
                                                <Ticket size={18} strokeWidth={2.5} className="text-amber-500" />
                                                <span>{Number(showtime.price).toLocaleString()}</span>
                                                <span className="text-[10px] text-amber-500/60 uppercase tracking-widest mt-1 ml-0.5">VNĐ</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                                                <button
                                                    onClick={() => handleOpenEdit(showtime)}
                                                    className="p-2.5 bg-slate-50 hover:bg-indigo-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-sm"
                                                    title="Edit Showtime"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setShowtimeToDelete(showtime.id);
                                                        setIsDeleteModalOpen(true);
                                                    }}
                                                    className="p-2.5 bg-slate-50 hover:bg-rose-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-sm"
                                                    title="Delete Showtime"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {!isLoadingShowtimes && filteredShowtimes?.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-8 py-24 text-center">
                                        <div className="flex flex-col items-center opacity-20">
                                            <Clock size={64} className="mb-6 stroke-[1.5]" />
                                            <p className="text-xl font-black uppercase tracking-widest">No screenings found</p>
                                            <p className="text-sm font-medium">Try searching for another movie or session date</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row items-center justify-between px-6 py-2 gap-4">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                    Displaying <span className="text-slate-900">{filteredShowtimes?.length || 0}</span> scheduled screenings
                </p>
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                    <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors disabled:opacity-20" disabled><ChevronLeft size={20} /></button>
                    <div className="flex items-center gap-1">
                        <span className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-lg shadow-indigo-600/20">1</span>
                    </div>
                    <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors disabled:opacity-20" disabled><ChevronRight size={20} /></button>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <ModalCustom
                    onClose={() => setIsModalOpen(false)}
                    className="w-full max-w-2xl !bg-white !text-slate-900 border-none rounded-[3rem] p-0 overflow-hidden shadow-2xl"
                >
                    <div className="p-10">
                        <div className="flex items-center gap-5 mb-10">
                            <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                                {editingShowtime ? <Edit size={30} strokeWidth={2.5} /> : <Plus size={30} strokeWidth={2.5} />}
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tight">{editingShowtime ? 'Revise Screening' : 'Schedule Screening'}</h2>
                                <p className="text-slate-400 font-medium text-sm">Configure movie, room, and session precision timing</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Target Production</label>
                                    <div className="relative">
                                        <select
                                            {...register('movie_id')}
                                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all appearance-none cursor-pointer font-bold text-slate-900"
                                        >
                                            <option value="">Select a movie</option>
                                            {movies?.map((m: IMovie) => (
                                                <option key={m.id} value={m.id}>{m.title}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <ChevronRight size={16} className="rotate-90" />
                                        </div>
                                    </div>
                                    {errors.movie_id && <p className="text-[10px] text-rose-500 flex items-center gap-1.5 mt-1 font-black uppercase tracking-wider"><AlertCircle size={14} /> {errors.movie_id.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Assigned Facility</label>
                                    <div className="relative">
                                        <select
                                            {...register('room_id')}
                                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all appearance-none cursor-pointer font-bold text-slate-900"
                                        >
                                            <option value="">Select a room</option>
                                            {rooms?.map((r: IRoom) => (
                                                <option key={r.id} value={r.id}>{r.name} - {r.theater?.name}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <ChevronRight size={16} className="rotate-90" />
                                        </div>
                                    </div>
                                    {errors.room_id && <p className="text-[10px] text-rose-500 flex items-center gap-1.5 mt-1 font-black uppercase tracking-wider"><AlertCircle size={14} /> {errors.room_id.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Initiation Time</label>
                                    <input
                                        type="datetime-local"
                                        {...register('start_time')}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all font-bold text-slate-900"
                                    />
                                    {errors.start_time && <p className="text-[10px] text-rose-500 mt-1 font-black uppercase tracking-wider">{errors.start_time.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Termination Time</label>
                                    <input
                                        type="datetime-local"
                                        {...register('end_time')}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all font-bold text-slate-900"
                                    />
                                    {errors.end_time && <p className="text-[10px] text-rose-500 mt-1 font-black uppercase tracking-wider">{errors.end_time.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Ticket Valuation (VNĐ)</label>
                                <div className="relative">
                                    <Ticket className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} strokeWidth={2.5} />
                                    <input
                                        type="number"
                                        {...register('price')}
                                        className="w-full bg-slate-50 border-none rounded-2xl pl-16 pr-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all font-black text-amber-600 text-lg"
                                        placeholder="100,000"
                                    />
                                </div>
                                {errors.price && <p className="text-[10px] text-rose-500 mt-1 font-black uppercase tracking-wider">{errors.price.message}</p>}
                            </div>

                            <div className="flex items-center gap-4 pt-8">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4 bg-slate-50 text-slate-400 hover:text-slate-900 font-black text-sm uppercase tracking-widest transition-all rounded-2xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createShowTime.isPending || updateShowTime.isPending}
                                    className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50 text-sm flex items-center justify-center gap-3 active:scale-[0.98]"
                                >
                                    {(createShowTime.isPending || updateShowTime.isPending) && (
                                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    )}
                                    {editingShowtime ? 'Save Changes' : 'Confirm & Schedule'}
                                </button>
                            </div>
                        </form>
                    </div>
                </ModalCustom>
            )}

            {/* Delete Confirmation */}
            {isDeleteModalOpen && (
                <ModalCustom onClose={() => setIsDeleteModalOpen(false)} className="w-full max-w-[450px] !bg-white !text-slate-900 border-none rounded-[3rem] p-10 shadow-2xl text-center">
                    <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-rose-100/50">
                        <Trash2 size={40} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-2xl font-black mb-3 tracking-tight">Final deletion?</h3>
                    <p className="text-slate-400 font-medium text-sm mb-10 leading-relaxed px-4">
                        You are about to permanently remove this screening session. This will affect any existing <span className="text-rose-600">active bookings</span> associated with it.
                    </p>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handleDelete}
                            className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-600/20 text-sm active:scale-[0.98]"
                        >
                            Confirm Deletion
                        </button>
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="w-full py-4 bg-slate-50 text-slate-400 hover:text-slate-900 font-black text-sm uppercase tracking-widest transition-all rounded-2xl"
                        >
                            Keep Session
                        </button>
                    </div>
                </ModalCustom>
            )}
        </div>
    );
};

export default Showtime;
