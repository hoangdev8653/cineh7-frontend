import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Plus } from 'lucide-react';
import ModalCustom from '../../../components/common/Modal';
import { movieSchema } from '../../../schema/movie';
import type { IMovie } from '../../../types/movie.types';
import * as z from 'zod';

type MovieFormData = z.infer<typeof movieSchema>;

interface MovieFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: MovieFormData) => void;
    editingMovie: IMovie | null;
    isPending: boolean;
}

const MovieFormModal: React.FC<MovieFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    editingMovie,
    isPending
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<MovieFormData>({
        resolver: zodResolver(movieSchema) as any,
        defaultValues: editingMovie ? {
            title: editingMovie.title,
            slug: editingMovie.slug,
            description: editingMovie.description,
            releaseDate: editingMovie.releaseDate?.split('T')[0] || '',
            duration: editingMovie.duration,
            rating: editingMovie.rating,
            comingSoon: editingMovie.comingSoon,
            isShowing: editingMovie.isShowing,
        } : {
            title: '',
            slug: '',
            description: '',
            releaseDate: '',
            duration: 120,
            rating: 10,
            comingSoon: false,
            isShowing: true,
        }
    });

    if (!isOpen) return null;

    return (
        <ModalCustom
            onClose={onClose}
            className="w-full max-w-4xl max-h-[90vh] !bg-white !text-slate-900 border-none rounded-[3rem] overflow-y-auto shadow-2xl"
        >
            <div className="p-10">
                <div className="flex items-center gap-5 mb-10 pb-6 border-b border-slate-100">
                    <div className="p-4 bg-indigo-50 rounded-[1.5rem] text-indigo-600">
                        {editingMovie ? <Edit size={28} strokeWidth={2.5} /> : <Plus size={28} strokeWidth={2.5} />}
                    </div>
                    <div>
                        <h2 className="text-3xl font-black tracking-tight">{editingMovie ? 'Chỉnh Sửa Phim' : 'Thêm Phim Mới'}</h2>
                        <p className="text-slate-400 font-medium text-sm">Cập nhật thông tin dựa trên yêu cầu API mới.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Title & Slug */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tên Phim (title)</label>
                                <input
                                    {...register('title')}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                    placeholder="Nhập tên phim"
                                />
                                {errors.title && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{String(errors.title.message)}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Đường dẫn thân thiện (slug)</label>
                                <input
                                    {...register('slug')}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                    placeholder="biet-doi-san-ma-..."
                                />
                                {errors.slug && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{String(errors.slug.message)}</p>}
                            </div>
                        </div>

                        {/* Trailer & Poster (Files) */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Trailer (File)</label>
                                <input
                                    type="file"
                                    {...register('trailer')}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                                />
                                {editingMovie?.trailer && !errors.trailer && <p className="text-[10px] text-slate-400 ml-1">Hiện tại: {editingMovie.trailer.split('/').pop()}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Poster (File)</label>
                                <input
                                    type="file"
                                    {...register('poster')}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                                />
                                {editingMovie?.poster && !errors.poster && <p className="text-[10px] text-slate-400 ml-1">Hiện tại: {editingMovie.poster.split('/').pop()}</p>}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Mô Tả (description)</label>
                            <textarea
                                {...register('description')}
                                rows={3}
                                className="w-full bg-slate-50 border-none rounded-[1.5rem] px-6 py-4 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all resize-none font-bold text-sm"
                                placeholder="Nhập mô tả phim..."
                            />
                            {errors.description && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{String(errors.description.message)}</p>}
                        </div>

                        {/* ReleaseDate, Rating, Duration */}
                        <div className="grid grid-cols-3 md:col-span-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Ngày chiếu (releaseDate)</label>
                                <input
                                    type="date"
                                    {...register('releaseDate')}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Đánh giá (rating)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    {...register('rating', { valueAsNumber: true })}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Thời lượng (duration)</label>
                                <input
                                    type="number"
                                    {...register('duration', { valueAsNumber: true })}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                />
                            </div>
                        </div>

                        {/* Booleans */}
                        <div className="md:col-span-2 flex items-center gap-12 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="comingSoon"
                                    {...register('comingSoon')}
                                    className="w-5 h-5 rounded-lg border-2 border-slate-300 text-indigo-600 focus:ring-indigo-600/20 transition-all cursor-pointer"
                                />
                                <label htmlFor="comingSoon" className="text-sm font-black text-slate-700 cursor-pointer uppercase tracking-tight">Sắp Chiếu (comingSoon)</label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="isShowing"
                                    {...register('isShowing')}
                                    className="w-5 h-5 rounded-lg border-2 border-slate-300 text-indigo-600 focus:ring-indigo-600/20 transition-all cursor-pointer"
                                />
                                <label htmlFor="isShowing" className="text-sm font-black text-slate-700 cursor-pointer uppercase tracking-tight">Đang Chiếu (isShowing)</label>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-8 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-8 py-3 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all font-black text-sm uppercase tracking-wider"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-3.5 rounded-2xl font-black transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm uppercase tracking-wider"
                        >
                            {isPending && (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            )}
                            {editingMovie ? 'Cập Nhật Phim' : 'Lưu Phim'}
                        </button>
                    </div>
                </form>
            </div>
        </ModalCustom>
    );
};

export default MovieFormModal;
