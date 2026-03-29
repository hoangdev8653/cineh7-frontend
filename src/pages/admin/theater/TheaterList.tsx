import React from 'react';
import { Edit, Trash2, MapPin, Theater as TheaterIcon } from 'lucide-react';
import type { ITheater } from '../../../types/theater.types';
import AdminPagination from '../../../components/common/AdminPagination';

interface TheaterListProps {
    theaterData?: any;
    isLoading: boolean;
    onEdit: (theater: ITheater) => void;
    onDelete: (id: string) => void;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const TheaterList: React.FC<TheaterListProps> = ({
    theaterData,
    isLoading,
    onEdit,
    onDelete,
    page,
    totalPages,
    onPageChange
}) => {

    return (
        <div className="space-y-6">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50">
                            <tr>
                                <th className="px-8 py-6 text-center">Tên Rạp</th>
                                <th className="px-8 py-6 text-center">Địa Chỉ</th>
                                <th className="px-8 py-6 text-center">Hệ Thống</th>
                                <th className="px-8 py-6 text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-8 py-10">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-slate-100 rounded-2xl"></div>
                                                <div className="space-y-2 flex-1">
                                                    <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                                                    <div className="h-3 bg-slate-100 rounded w-1/3"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                theaterData?.data?.theater?.map((theater: ITheater) => (
                                    <tr key={theater.id} className="hover:bg-slate-50 transition-all group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md overflow-hidden">
                                                    <img src={theater.logo || (theater.system as any)?.logo} alt={theater.name} className="w-full h-full object-cover" />
                                                </div>
                                                <span className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{theater.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-start gap-2.5 text-slate-500 font-medium max-w-[350px]">
                                                <MapPin size={16} className="mt-0.5 text-rose-500 shrink-0" />
                                                <span className="text-sm line-clamp-2">{theater.address}</span>
                                            </div>
                                        </td>

                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 shadow-sm overflow-hidden flex-shrink-0">
                                                    <img src={theater.system?.logo || (theater as any).theaterSystem?.logo} alt={theater.system?.name || (theater as any).theaterSystem?.name} className="w-full h-full object-contain p-1" />
                                                </div>
                                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">{theater.system?.name || (theater as any).theaterSystem?.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                                                <button
                                                    onClick={() => onEdit(theater)}
                                                    className="p-2.5 bg-slate-50 hover:bg-indigo-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-sm"
                                                    title="Edit Theater"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => onDelete(theater.id)}
                                                    className="p-2.5 bg-slate-50 hover:bg-rose-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-sm"
                                                    title="Delete Theater"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            {!isLoading && theaterData?.data?.theater?.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-24 text-center">
                                        <div className="flex flex-col items-center opacity-20">
                                            <TheaterIcon size={64} className="mb-6 stroke-[1.5]" />
                                            <p className="text-xl font-black uppercase tracking-widest">Không tìm thấy kết quả</p>
                                            <p className="text-sm font-medium">Hãy thử thay đổi từ khóa tìm kiếm</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row items-center justify-between px-6 py-2 gap-4">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                    Hiển thị <span className="text-slate-900">{theaterData?.data?.theater?.length || 0}</span> địa điểm rạp
                </p>
                {totalPages > 0 && (
                    <AdminPagination
                        totalPages={totalPages}
                        page={page}
                        onPageChange={onPageChange}
                    />
                )}
            </div>
        </div>
    );
};

export default TheaterList;
