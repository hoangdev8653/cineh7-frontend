import React from 'react';
import { Edit, Trash2, Calendar, Clock, Monitor, Ticket, Film, ChevronLeft, ChevronRight } from 'lucide-react';
import type { IShowtime } from '../../../types/showtime.types';
import { formatDateTime } from '../../../utils/date';

interface ShowtimeListProps {
    showtimes: IShowtime[];
    isLoading: boolean;
    onEdit: (showtime: IShowtime) => void;
    onDelete: (id: string) => void;
}

const ShowtimeList: React.FC<ShowtimeListProps> = ({
    showtimes,
    isLoading,
    onEdit,
    onDelete
}) => {
    return (
        <div className="space-y-6">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50">
                            <tr>
                                <th className="px-8 py-6">Phim & Phòng Chiếu</th>
                                <th className="px-8 py-6">Lịch Chiếu</th>
                                <th className="px-8 py-6">Giá Vé</th>
                                <th className="px-8 py-6 text-right">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
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
                            ) : (
                                showtimes.map((showtime: IShowtime) => {
                                    const movie = showtime.movie;
                                    const room = showtime.room;
                                    const start = formatDateTime(showtime.startTime);

                                    const startDate = new Date(showtime.startTime);
                                    const endDate = new Date(startDate.getTime() + (movie?.duration || 0) * 60000);
                                    const end = formatDateTime(endDate.toISOString());

                                    return (
                                        <tr key={showtime.id} className="hover:bg-slate-50 transition-all group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-16 rounded-2xl bg-slate-100 flex-shrink-0 bg-cover bg-center border border-slate-200 shadow-sm"
                                                        style={{ backgroundImage: `url(${movie?.poster})` }}>
                                                        {!movie?.poster && <Film className="w-full h-full p-4 text-slate-300" />}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{movie?.title || 'Chưa rõ phim'}</p>
                                                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-bold uppercase tracking-wider">
                                                            <Monitor size={12} strokeWidth={3} className="text-indigo-500" />
                                                            <span>{room?.name || 'Chưa xếp phòng'}</span>
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
                                                        onClick={() => onEdit(showtime)}
                                                        className="p-2.5 bg-slate-50 hover:bg-indigo-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-sm"
                                                        title="Edit Showtime"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => onDelete(showtime.id)}
                                                        className="p-2.5 bg-slate-50 hover:bg-rose-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-sm"
                                                        title="Delete Showtime"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                            {!isLoading && showtimes.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-8 py-24 text-center">
                                        <div className="flex flex-col items-center opacity-20">
                                            <Clock size={64} className="mb-6 stroke-[1.5]" />
                                            <p className="text-xl font-black uppercase tracking-widest">Không có lịch chiếu nào</p>
                                            <p className="text-sm font-medium">Thử tìm kiếm theo phim hoặc ngày khác</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Placeholder (Simple for now) */}
            <div className="flex flex-col md:flex-row items-center justify-between px-6 py-2 gap-4">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                    Hiển thị <span className="text-slate-900">{showtimes.length}</span> lịch chiếu đã lên lịch
                </p>
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                    <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors disabled:opacity-20" disabled><ChevronLeft size={20} /></button>
                    <div className="flex items-center gap-1">
                        <span className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-lg shadow-indigo-600/20">1</span>
                    </div>
                    <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors disabled:opacity-20" disabled><ChevronRight size={20} /></button>
                </div>
            </div>
        </div>
    );
};

export default ShowtimeList;
