import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Plus,
    Edit,
    AlertCircle,
    Type,
    ChevronRight,
    Image as ImageIcon
} from 'lucide-react';
import ModalCustom from '../../../components/common/Modal';
import type { NewsEventFormData, NewsEventFormProps } from '../../../types/event.types';
import { newsEventSchema } from '../../../schema/event';


const NewsEventForm: React.FC<NewsEventFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    editingItem,
    isPending
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<NewsEventFormData>({
        resolver: zodResolver(newsEventSchema),
        defaultValues: editingItem ? {
            title: editingItem.title,
            slug: editingItem.slug,
            content: editingItem.content,
            thumbnail: undefined,
            type: editingItem.type,
        } : {
            title: '',
            slug: '',
            content: '',
            thumbnail: undefined,
            type: 'NEWS',
        }
    });

    if (!isOpen) return null;

    return (
        <ModalCustom
            onClose={onClose}
            className="w-full max-w-4xl !bg-white !text-slate-900 border-none rounded-[3rem] p-0 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        >
            <div className="p-10">
                <div className="flex items-center gap-5 mb-10">
                    <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                        {editingItem ? <Edit size={30} strokeWidth={2.5} /> : <Plus size={30} strokeWidth={2.5} />}
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">{editingItem ? 'Chỉnh Sửa Bài Viết' : 'Bài Viết Mới'}</h2>
                        <p className="text-slate-400 font-medium text-sm">Soạn thảo và xuất bản tin tức hoặc sự kiện cho rạp chiếu phim.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div className=" gap-4 items-center">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tiêu Đề</label>
                                <div className="flex flex-col">
                                    <input
                                        {...register('title')}
                                        className="w-2/3 bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all placeholder:text-slate-300 font-black text-slate-900"
                                        placeholder="Nhập tiêu đề bài viết..."
                                    />
                                    {errors.title && <p className="text-[10px] text-rose-500 flex items-center gap-1.5 mt-1 font-black uppercase tracking-wider"><AlertCircle size={14} /> {errors.title?.message}</p>}
                                </div>
                            </div>

                            <div className=" gap-4 items-center">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Đường Dẫn</label>
                                <div className="flex flex-col">
                                    <input
                                        {...register('slug')}
                                        className="w-2/3 bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all placeholder:text-slate-300 font-bold text-sm text-slate-900"
                                        placeholder="vi-du-bai-viet-moi"
                                    />
                                    {errors.slug && <p className="text-[10px] text-rose-500 mt-1 font-black uppercase tracking-wider">{errors.slug?.message as string}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phân Loại</label>
                                <div className="relative">
                                    <Type className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-400" size={18} strokeWidth={2.5} />
                                    <select
                                        {...register('type')}
                                        className="w-full bg-slate-50 border-none rounded-2xl pl-16 pr-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all appearance-none cursor-pointer font-bold text-slate-900"
                                    >
                                        <option value="NEWS">Tin Tức</option>
                                        <option value="EVENT">Sự Kiện</option>
                                        <option value="PROMOTION">Khuyến Mãi</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <ChevronRight size={14} className="rotate-90" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Ảnh Bìa (Tệp tin)</label>
                                <div className="relative">
                                    <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-400" size={18} strokeWidth={2.5} />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        {...register('thumbnail')}
                                        className="w-full bg-slate-50 border-none rounded-2xl pl-16 pr-6 py-3.5 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-widest file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer text-xs font-bold text-slate-500"
                                    />
                                </div>
                                {errors.thumbnail && <p className="text-[10px] text-rose-500 mt-1 font-black uppercase tracking-wider">{errors.thumbnail?.message as string}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nội Dung Chi Tiết</label>
                        <textarea
                            {...register('content')}
                            rows={8}
                            className="w-full bg-slate-50 border-none rounded-[2.5rem] px-8 py-8 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all placeholder:text-slate-300 font-medium text-sm leading-relaxed"
                            placeholder="Soạn nội dung chi tiết bài viết tại đây..."
                        />
                        {errors.content && <p className="text-[10px] text-rose-500 mt-1 font-black uppercase tracking-wider">{errors.content?.message}</p>}
                    </div>

                    <div className="flex items-center gap-4 pt-10">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 bg-slate-50 text-slate-400 hover:text-slate-900 font-black text-xs uppercase tracking-widest transition-all rounded-full"
                        >
                            Hủy Bỏ
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-[2] w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-full font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50 text-xs flex items-center justify-center gap-3 active:scale-[0.98]"
                        >
                            {isPending && (
                                <div className="cursor-pointer w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            )}
                            {editingItem ? 'Cập Nhật Bài Viết' : 'Xuất Bản Ngay'}
                        </button>
                    </div>
                </form>
            </div>
        </ModalCustom>
    );
};

export default NewsEventForm;
