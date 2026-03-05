import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Plus,
    Edit,
    Trash2,
    Image as ImageIcon,
    Tag,
    Calendar,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    Type,
    FileText
} from 'lucide-react';
import { useNewsEvents, useNewsEventMutations } from '../../../hooks/useNewsEvent';
import type { INewsEvent, NewsEventDto } from '../../../types/news-event.types';
import ModalCustom from '../../../components/common/Modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const newsEventSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    content: z.string().min(10, 'Content must be at least 10 characters'),
    image_url: z.string().url('Must be a valid image URL'),
    type: z.enum(['NEWS', 'EVENT']),
});

type NewsEventFormData = z.infer<typeof newsEventSchema>;

const NewsEvent: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<'ALL' | 'NEWS' | 'EVENT'>('ALL');
    const { data: newsEvents, isLoading: isLoadingList } = useNewsEvents();
    const { createNewsEvent, updateNewsEvent, deleteNewsEvent } = useNewsEventMutations();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<INewsEvent | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsEventFormData>({
        resolver: zodResolver(newsEventSchema),
    });

    const filteredItems = newsEvents?.data?.filter((item: INewsEvent) => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = typeFilter === 'ALL' || item.type === typeFilter;
        return matchesSearch && matchesType;
    });


    const handleOpenAdd = () => {
        setEditingItem(null);
        reset({
            title: '',
            description: '',
            content: '',
            image_url: '',
            type: 'NEWS',
        });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (item: INewsEvent) => {
        setEditingItem(item);
        reset({
            title: item.title,
            description: item.description,
            content: item.content,
            image_url: item.image_url,
            type: item.type,
        });
        setIsModalOpen(true);
    };

    const onSubmit = (data: NewsEventFormData) => {
        if (editingItem) {
            updateNewsEvent.mutate({ id: editingItem.id, newsEventDto: data }, {
                onSuccess: () => setIsModalOpen(false)
            });
        } else {
            createNewsEvent.mutate(data, {
                onSuccess: () => setIsModalOpen(false)
            });
        }
    };

    const handleDelete = () => {
        if (itemToDelete) {
            deleteNewsEvent.mutate(itemToDelete, {
                onSuccess: () => setIsDeleteModalOpen(false)
            });
        }
    };

    const formatDate = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            return dateStr;
        }
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">News & Events</h1>
                    <p className="text-slate-400 font-medium mt-1">Manage promotions, cinema news, and special events for your audience</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3.5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20 active:scale-95 text-xs"
                >
                    <Plus size={18} strokeWidth={3} />
                    Create New Item
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white border border-slate-100 p-2 rounded-[2rem] shadow-sm flex flex-col md:flex-row items-center gap-2 pr-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by publication title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent text-slate-900 pl-16 pr-6 py-4 rounded-xl outline-none transition-all placeholder:text-slate-400 font-medium"
                    />
                </div>
                <div className="h-10 w-[1px] bg-slate-100 mx-2 hidden md:block"></div>
                <div className="flex items-center gap-4 px-4 w-full md:w-auto">
                    <Tag className="text-indigo-600 hidden md:block" size={18} />
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value as any)}
                        className="bg-slate-50 border-none text-slate-900 px-6 py-3 rounded-xl focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all cursor-pointer font-bold text-xs w-full md:w-44 appearance-none"
                    >
                        <option value="ALL">All Categories</option>
                        <option value="NEWS">Social News</option>
                        <option value="EVENT">System Events</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50">
                            <tr>
                                <th className="px-8 py-6">Publication Info</th>
                                <th className="px-8 py-6">Brief Summary</th>
                                <th className="px-8 py-6">Identity Tag</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoadingList ? (
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
                            ) : filteredItems?.map((item: INewsEvent) => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-14 rounded-2xl bg-slate-100 flex-shrink-0 bg-cover bg-center border border-slate-200 shadow-sm group-hover:scale-105 transition-transform overflow-hidden"
                                                style={{ backgroundImage: `url(${item.image_url})` }}>
                                                {!item.image_url && (
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
                                    <td className="px-8 py-6">
                                        <p className="text-slate-500 text-xs italic line-clamp-2 max-w-[300px] leading-relaxed">"{item.description}"</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase border transition-all ${item.type === 'NEWS'
                                            ? 'bg-indigo-50 text-indigo-600 border-indigo-100'
                                            : 'bg-purple-50 text-purple-600 border-purple-100'
                                            }`}>
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                                            <button
                                                onClick={() => handleOpenEdit(item)}
                                                className="p-2.5 bg-slate-50 hover:bg-indigo-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-sm"
                                                title="Edit Article"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setItemToDelete(item.id);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="p-2.5 bg-slate-50 hover:bg-rose-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-sm"
                                                title="Delete Article"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!isLoadingList && filteredItems?.length === 0 && (
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

            {/* Footer */}
            <div className="flex flex-col md:flex-row items-center justify-between px-6 py-2 gap-4">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest italic">
                    Total <span className="text-slate-900 not-italic">{newsEvents?.total || 0}</span> strategic publications active
                </p>
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                    <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors disabled:opacity-20" disabled={newsEvents?.page === 1}><ChevronLeft size={20} /></button>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: newsEvents?.totalPage || 0 }).map((_, i) => (
                            <button
                                key={i + 1}
                                className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black transition-all ${newsEvents?.page === i + 1
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                    : 'text-slate-400 hover:bg-slate-50'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        {(!newsEvents?.totalPage || newsEvents.totalPage === 0) && (
                            <span className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-lg shadow-indigo-600/20">1</span>
                        )}
                    </div>
                    <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors disabled:opacity-20" disabled={newsEvents?.page === newsEvents?.totalPage || !newsEvents?.totalPage}><ChevronRight size={20} /></button>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <ModalCustom
                    onClose={() => setIsModalOpen(false)}
                    className="w-full max-w-4xl !bg-white !text-slate-900 border-none rounded-[3rem] p-0 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
                >
                    <div className="p-10">
                        <div className="flex items-center gap-5 mb-10">
                            <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                                {editingItem ? <Edit size={30} strokeWidth={2.5} /> : <Plus size={30} strokeWidth={2.5} />}
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tight">{editingItem ? 'Edit Publication' : 'New Publication'}</h2>
                                <p className="text-slate-400 font-medium text-sm">Draft and publish news or events to your cinema infrastructure</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Headline Designation</label>
                                        <input
                                            {...register('title')}
                                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all placeholder:text-slate-300 font-black text-slate-900"
                                            placeholder="Enter compelling headline..."
                                        />
                                        {errors.title && <p className="text-[10px] text-rose-500 flex items-center gap-1.5 mt-1 font-black uppercase tracking-wider"><AlertCircle size={14} /> {errors.title.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Exec Summary</label>
                                        <textarea
                                            {...register('description')}
                                            rows={2}
                                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all placeholder:text-slate-300 font-bold italic text-sm leading-relaxed"
                                            placeholder="Catchy summary for the list view components..."
                                        />
                                        {errors.description && <p className="text-[10px] text-rose-500 mt-1 font-black uppercase tracking-wider">{errors.description.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Identity Tag</label>
                                        <div className="relative">
                                            <Type className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-400" size={18} strokeWidth={2.5} />
                                            <select
                                                {...register('type')}
                                                className="w-full bg-slate-50 border-none rounded-2xl pl-16 pr-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all appearance-none cursor-pointer font-bold text-slate-900"
                                            >
                                                <option value="NEWS">Social news</option>
                                                <option value="EVENT">Cinema Event</option>
                                            </select>
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                <ChevronRight size={14} className="rotate-90" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Thumbnail URI</label>
                                        <div className="relative">
                                            <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-400" size={18} strokeWidth={2.5} />
                                            <input
                                                {...register('image_url')}
                                                className="w-full bg-slate-50 border-none rounded-2xl pl-16 pr-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all placeholder:text-slate-300 text-xs font-bold"
                                                placeholder="https://content-server.com/..."
                                            />
                                        </div>
                                        {errors.image_url && <p className="text-[10px] text-rose-500 mt-1 font-black uppercase tracking-wider">{errors.image_url.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Detailed Protocol Content</label>
                                <textarea
                                    {...register('content')}
                                    rows={8}
                                    className="w-full bg-slate-50 border-none rounded-[2.5rem] px-8 py-8 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all placeholder:text-slate-300 font-medium text-sm leading-relaxed"
                                    placeholder="Draft your comprehensive publication contents here..."
                                />
                                {errors.content && <p className="text-[10px] text-rose-500 mt-1 font-black uppercase tracking-wider">{errors.content.message}</p>}
                            </div>

                            <div className="flex items-center gap-4 pt-10">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4 bg-slate-50 text-slate-400 hover:text-slate-900 font-black text-sm uppercase tracking-widest transition-all rounded-2xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createNewsEvent.isPending || updateNewsEvent.isPending}
                                    className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50 text-sm flex items-center justify-center gap-3 active:scale-[0.98]"
                                >
                                    {(createNewsEvent.isPending || updateNewsEvent.isPending) && (
                                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    )}
                                    {editingItem ? 'Propagate Update' : 'Publish Protocol'}
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
                    <h3 className="text-2xl font-black mb-3 tracking-tight">Trash publication?</h3>
                    <p className="text-slate-400 font-medium text-sm mb-10 leading-relaxed px-4">
                        Deleting this <span className="text-rose-600">article infrastructure</span> will remove it from all public user interfaces immediately. Are you sure?
                    </p>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handleDelete}
                            className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-600/20 text-sm active:scale-[0.98]"
                        >
                            Confirm Removal
                        </button>
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="w-full py-4 bg-slate-50 text-slate-400 hover:text-slate-900 font-black text-sm uppercase tracking-widest transition-all rounded-2xl"
                        >
                            Retain Archive
                        </button>
                    </div>
                </ModalCustom>
            )}
        </div>
    );
};

export default NewsEvent;
