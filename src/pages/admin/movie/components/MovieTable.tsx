import React from 'react';
import { Film, Calendar, Edit, Trash2 } from 'lucide-react';
import type { IMovie } from '../../../../types/movie.types';

interface MovieTableProps {
    movies: any;
    isLoading: boolean;
    onEdit: (movie: IMovie) => void;
    onDelete: (id: string) => void;
}

const MovieTable: React.FC<MovieTableProps> = ({ movies, isLoading, onEdit, onDelete }) => {
    return (
        <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50">
                        <tr>
                            <th className="px-8 py-5">Thông tin phim</th>
                            <th className="px-6 py-5">Trạng thái</th>
                            <th className="px-6 py-5 text-center">Thời lượng</th>
                            <th className="px-6 py-5 text-center">Độ tuổi</th>
                            <th className="px-8 py-5 text-right">Hành động</th>
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
                        ) : movies && movies?.data?.movie?.length > 0 ? (
                            movies?.data?.movie?.map((movie: IMovie) => (
                                <tr key={movie.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-20 rounded-xl bg-slate-100 flex-shrink-0 bg-cover bg-center shadow-sm overflow-hidden"
                                                style={{ backgroundImage: `url(${movie.poster})` }}>
                                                {!movie.poster && <Film className="w-full h-full p-4 text-slate-300" />}
                                            </div>
                                            <div className="max-w-[300px]">
                                                <p className="font-black text-slate-900 truncate text-base leading-tight mb-1">{movie.title}</p>
                                                <div className="flex items-center gap-3">
                                                    <p className="text-[10px] font-bold text-slate-400 flex items-center bg-slate-100 px-2 py-0.5 rounded-lg">
                                                        <Calendar size={10} className="mr-1" />
                                                        {movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString() : 'N/A'}
                                                    </p>
                                                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">Rating: {movie.rating}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            {movie.isShowing && (
                                                <span className="text-[9px] font-black bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg border border-emerald-100/50 uppercase tracking-widest">
                                                    Đang chiếu
                                                </span>
                                            )}
                                            {movie.comingSoon && (
                                                <span className="text-[9px] font-black bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg border border-indigo-100/50 uppercase tracking-widest">
                                                    Sắp chiếu
                                                </span>
                                            )}
                                            {!movie.isShowing && !movie.comingSoon && (
                                                <span className="text-[9px] font-black bg-slate-50 text-slate-400 px-2.5 py-1 rounded-lg border border-slate-100 uppercase tracking-widest">
                                                    Ngừng chiếu
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <div className="inline-flex flex-col items-center">
                                            <span className="text-sm text-slate-700 font-black">{movie.duration}m</span>
                                            <div className="w-1 h-1 bg-indigo-200 rounded-full mt-1"></div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${movie.metadata?.rating === 'P' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                            movie.metadata?.rating?.startsWith('T') ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                movie.metadata?.rating === 'C' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                                                    'bg-slate-50 text-slate-600 border border-slate-100'
                                            }`}>
                                            {movie.metadata?.rating || 'N/A'}
                                        </span>
                                    </td>

                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => onEdit(movie)}
                                                className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                                title="Edit Movie"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(movie.id)}
                                                className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                                title="Delete Movie"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))) : (
                            <tr>
                                <td colSpan={5} className="px-8 py-20">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mb-6">
                                            <Film size={40} />
                                        </div>
                                        <p className="text-lg font-black text-slate-900 tracking-tight">Không tìm thấy phim</p>
                                        <p className="text-slate-400 text-sm font-medium mt-1">Hãy thử điều chỉnh từ khóa tìm kiếm hoặc bộ lọc</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MovieTable;
