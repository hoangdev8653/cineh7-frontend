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
    imageUrl: z.string().url('Must be a valid image URL'),
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

    const filteredItems = newsEvents?.filter((item: INewsEvent) => {
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
            imageUrl: '',
            type: 'NEWS',
        });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (item: INewsEvent) => {
        setEditingItem(item);
        reset(item);
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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white uppercase tracking-tight">News & Events</h1>
                    <p className="text-gray-400">Manage promotions, cinema news, and special events</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95 text-sm"
                >
                    <Plus size={18} />
                    Create New Item
                </button>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700 p-4 rounded-2xl flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white pl-12 pr-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600 text-sm"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Tag className="text-gray-500" size={18} />
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value as any)}
                        className="bg-gray-900 border border-gray-700 text-white px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer text-sm w-full md:w-40 appearance-none"
                    >
                        <option value="ALL">All Types</option>
                        <option value="NEWS">News</option>
                        <option value="EVENT">Events</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-gray-800 border border-gray-700 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-900/60 text-gray-500 text-[10px] uppercase font-black tracking-[0.2em] border-b border-gray-700/50">
                            <tr>
                                <th className="px-8 py-5">Article Info</th>
                                <th className="px-8 py-5">Summary</th>
                                <th className="px-8 py-5">Category</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/30">
                            {isLoadingList ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={4} className="px-8 py-10 bg-gray-800/10 h-28"></td>
                                    </tr>
                                ))
                            ) : filteredItems?.map((item: INewsEvent) => (
                                <tr key={item.id} className="hover:bg-gray-700/20 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-14 rounded-xl bg-gray-700 flex-shrink-0 bg-cover bg-center border border-gray-600 shadow-lg group-hover:scale-110 transition-transform"
                                                style={{ backgroundImage: `url(${item.imageUrl})` }}>
                                                {!item.imageUrl && <ImageIcon className="w-full h-full p-4 text-gray-500" />}
                                            </div>
                                            <div className="max-w-[250px]">
                                                <p className="font-bold text-gray-200 group-hover:text-white transition-colors truncate">{item.title}</p>
                                                <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500">
                                                    <Calendar size={12} className="text-blue-500 opacity-60" />
                                                    <span>{formatDate(item.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className="text-gray-400 text-xs italic line-clamp-2 max-w-[300px]">"{item.description}"</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${item.type === 'NEWS'
                                                ? 'bg-blue-900/30 text-blue-400 border-blue-800/50'
                                                : 'bg-purple-900/30 text-purple-400 border-purple-800/50'
                                            }`}>
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleOpenEdit(item)}
                                                className="p-2.5 bg-gray-900/50 hover:bg-blue-600 hover:text-white text-blue-400 border border-gray-700 rounded-xl transition-all"
                                                title="Edit Article"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setItemToDelete(item.id);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="p-2.5 bg-gray-900/50 hover:bg-rose-600 hover:text-white text-rose-500 border border-gray-700 rounded-xl transition-all"
                                                title="Delete Article"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!isLoadingList && filteredItems?.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center opacity-30">
                                            <FileText size={48} className="mb-4" />
                                            <p className="text-lg font-bold">No articles found</p>
                                            <p className="text-sm">Try using different search keywords</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Content Info */}
            <div className="flex items-center justify-between px-2 text-gray-500 text-[10px] uppercase font-black tracking-widest italic">
                <span>Total {filteredItems?.length || 0} active publications</span>
                <div className="flex items-center gap-2 not-italic">
                    <button className="p-2 hover:text-white transition-colors opacity-30 cursor-not-allowed"><ChevronLeft size={18} /></button>
                    <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-900/20">1</span>
                    <button className="p-2 hover:text-white transition-colors opacity-30 cursor-not-allowed"><ChevronRight size={18} /></button>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <ModalCustom
                    onClose={() => setIsModalOpen(false)}
                    className="w-full max-w-3xl !bg-gray-800 !text-white border border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto"
                >
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
                                {editingItem ? <Edit size={24} /> : <Plus size={24} />}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{editingItem ? 'Edit Publication' : 'New Publication'}</h2>
                                <p className="text-gray-400 text-xs text-italic">Draft and publish news or events to your cinema audience</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2 space-y-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Headline Title</label>
                                        <input
                                            {...register('title')}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700 font-bold"
                                            placeholder="Enter compelling headline..."
                                        />
                                        {errors.title && <p className="text-xs text-rose-500 flex items-center gap-1 mt-1"><AlertCircle size={12} /> {errors.title.message}</p>}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Short Description (Summary)</label>
                                        <textarea
                                            {...register('description')}
                                            rows={2}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700 resize-none italic text-sm"
                                            placeholder="Catchy summary for the list view..."
                                        />
                                        {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Category Type</label>
                                        <div className="relative">
                                            <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                            <select
                                                {...register('type')}
                                                className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer text-sm"
                                            >
                                                <option value="NEWS">Social News</option>
                                                <option value="EVENT">System Event</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Thumbnail Link</label>
                                        <div className="relative">
                                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                            <input
                                                {...register('imageUrl')}
                                                className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700 text-xs"
                                                placeholder="https://..."
                                            />
                                        </div>
                                        {errors.imageUrl && <p className="text-xs text-rose-500 mt-1">{errors.imageUrl.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Detailed Full Content</label>
                                <textarea
                                    {...register('content')}
                                    rows={8}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700 resize-y text-sm leading-relaxed"
                                    placeholder="Write your article content here..."
                                />
                                {errors.content && <p className="text-xs text-rose-500 mt-1">{errors.content.message}</p>}
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-700 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2.5 text-gray-500 hover:text-white font-bold transition-all text-xs uppercase tracking-widest"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createNewsEvent.isPending || updateNewsEvent.isPending}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-900/20 disabled:opacity-50 text-xs flex items-center gap-2"
                                >
                                    {(createNewsEvent.isPending || updateNewsEvent.isPending) && (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    )}
                                    {editingItem ? 'Push Update' : 'Publish Now'}
                                </button>
                            </div>
                        </form>
                    </div>
                </ModalCustom>
            )}

            {/* Delete Confirmation */}
            {isDeleteModalOpen && (
                <ModalCustom onClose={() => setIsDeleteModalOpen(false)} className="w-full max-w-sm !bg-gray-800 !text-white border border-gray-700 p-8 text-center shadow-2xl">
                    <div className="w-20 h-20 bg-rose-900/30 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-rose-800/40">
                        <Trash2 size={36} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Trash this article?</h3>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                        Deleting this <span className="text-white font-bold">publication</span> will remove it from all user interfaces immediately. Are you sure?
                    </p>
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={handleDelete}
                            className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-rose-900/30"
                        >
                            Confirm Trash
                        </button>
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="w-full py-3 text-gray-600 hover:text-white font-bold transition-all"
                        >
                            Wait, Keep it
                        </button>
                    </div>
                </ModalCustom>
            )}
        </div>
    );
};

export default NewsEvent;
