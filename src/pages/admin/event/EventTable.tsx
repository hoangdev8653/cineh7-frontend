import React from 'react';
import {
    Image as ImageIcon,
    Calendar,
    Edit,
    Trash2,
    FileText,
} from 'lucide-react';
import type { IEvent, NewsEventTableProps } from '../../../types/event.types';
import { formatDate } from '../../../utils/date';

const NewsEventTable: React.FC<NewsEventTableProps> = ({
    items,
    isLoading,
    onEdit,
    onDelete,
}) => {


    return (
        <div className="space-y-6">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50">
                            <tr>
                                <th className="px-8 py-6 text-center">Mục</th>
                                <th className="px-6 py-6 text-center">Loại</th>
                                <th className="px-6 py-6 text-center">Ngày Tạo</th>
                                <th className="px-8 py-6 text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={4} className="px-8 py-10">
                                            <div className="flex items-center gap-4">
                                                <div className="w-20 h-14 bg-slate-100 rounded-2xl"></div>
                                                <div className="space-y-2 flex-1">
                                                    <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                                                    <div className="h-3 bg-slate-100 rounded w-1/3"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : items?.map((item: IEvent) => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-14 rounded-2xl bg-slate-100 flex-shrink-0 bg-cover bg-center border border-slate-200 shadow-sm group-hover:scale-105 transition-transform overflow-hidden"
                                                style={{ backgroundImage: `url(${item.thumbnail})` }}>
                                                {!item.thumbnail && (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                        <ImageIcon size={24} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="max-w-[250px]">
                                                <p className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors truncate leading-tight">{item.title}</p>
                                                <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                                    <Calendar size={12} strokeWidth={3} className="text-indigo-500" />
                                                    <span>{formatDate(item.created_at)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-8 py-6 text-center">
                                        <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest inline-block ${item.type === 'NEWS'
                                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                            : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                                            }`}>
                                            {item.type === 'NEWS' ? 'Tin Tức' : 'Sự Kiện'}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <p className="text-slate-500 text-xs italic line-clamp-2 max-w-[300px] leading-relaxed">{formatDate(item.created_at)}</p>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                                            <button
                                                onClick={() => onEdit(item)}
                                                className="p-2.5 bg-slate-50 hover:bg-indigo-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-sm"
                                                title="Edit Article"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(item.id)}
                                                className="p-2.5 bg-slate-50 hover:bg-rose-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-sm"
                                                title="Delete Article"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!isLoading && items?.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-8 py-24 text-center">
                                        <div className="flex flex-col items-center opacity-20">
                                            <FileText size={64} className="mb-6 stroke-[1.5]" />
                                            <p className="text-xl font-black uppercase tracking-widest">No articles found</p>
                                            <p className="text-sm font-medium">Try using different search keywords</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default NewsEventTable;
