import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Plus, AlertCircle } from 'lucide-react';
import ModalCustom from '../../../../components/common/Modal';
import { movieSchema } from '../../../../schema/movie';
import type { IMovie } from '../../../../types/movie.types';
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
            description: editingMovie.description,
            release_date: editingMovie.releaseDate?.split('T')[0] || '',
            duration: editingMovie.duration,
            director: editingMovie.metadata?.director || '',
            actors: editingMovie.metadata?.actors?.join(', ') || '',
            genre: editingMovie.metadata?.genre || '',
            rating: editingMovie.metadata?.rating || 'P',
            language: editingMovie.metadata?.language || 'Tiếng Việt',
            image_url: editingMovie.poster || '',
            video_url: editingMovie.trailer || '',
        } : {
            title: '',
            description: '',
            release_date: '',
            duration: 120,
            genre: '',
            director: '',
            actors: '',
            rating: 'P',
            language: 'Tiếng Việt',
            image_url: '',
            video_url: '',
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
                        <p className="text-slate-400 font-medium text-sm">Cập nhật thông tin chi tiết cho bộ phim.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tên Phim</label>
                                <input
                                    {...register('title')}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                    placeholder="Nhập tên phim"
                                />
                                {errors.title && (
                                    <p className="text-xs text-rose-500 font-bold flex items-center gap-1.5 mt-1 ml-1">
                                        <AlertCircle size={14} /> {String(errors.title.message)}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Ngày Phát Hành</label>
                                    <input
                                        type="date"
                                        {...register('release_date')}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                    />
                                    {errors.release_date && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{String(errors.release_date.message)}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Thời Lượng (phút)</label>
                                    <input
                                        type="number"
                                        {...register('duration', { valueAsNumber: true })}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                    />
                                    {errors.duration && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{String(errors.duration.message)}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Đạo Diễn</label>
                                <input
                                    {...register('director')}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                    placeholder="Tên đạo diễn"
                                />
                                {errors.director && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{String(errors.director.message)}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Độ Tuổi</label>
                                <select
                                    {...register('rating')}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all cursor-pointer font-bold text-sm appearance-none"
                                >
                                    <option value="P">P - Mọi lứa tuổi</option>
                                    <option value="K">K - Trẻ em</option>
                                    <option value="T13">T13 - 13 tuổi trở lên</option>
                                    <option value="T16">T16 - 16 tuổi trở lên</option>
                                    <option value="T18">T18 - 18 tuổi trở lên</option>
                                    <option value="C">C - Cấm phổ biến</option>
                                </select>
                                {errors.rating && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{String(errors.rating.message)}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Ngôn Ngữ</label>
                                <input
                                    {...register('language')}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                    placeholder="Tiếng Việt / Phụ đề Tiếng Anh"
                                />
                                {errors.language && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{String(errors.language.message)}</p>}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Thể Loại (Cách nhau bằng dấu phẩy)</label>
                                <input
                                    {...register('genre')}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                    placeholder="Hành động, Phiêu lưu, Viễn tưởng"
                                />
                                {errors.genre && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{String(errors.genre.message)}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Diễn Viên (Cách nhau bằng dấu phẩy)</label>
                                <input
                                    {...register('actors')}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                    placeholder="Diễn viên 1, Diễn viên 2..."
                                />
                                {errors.actors && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{String(errors.actors.message)}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">URL Poster</label>
                                <input
                                    {...register('image_url')}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                    placeholder="https://example.com/poster.jpg"
                                />
                                {errors.image_url && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{String(errors.image_url.message)}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">URL Trailer</label>
                                <input
                                    {...register('video_url')}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm"
                                    placeholder="https://youtube.com/..."
                                />
                                {errors.video_url && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{String(errors.video_url.message)}</p>}
                            </div>
                        </div>

                        {/* Full Width Column */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Mô Tả</label>
                            <textarea
                                {...register('description')}
                                rows={4}
                                className="w-full bg-slate-50 border-none rounded-[1.5rem] px-6 py-4 text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all resize-none font-bold text-sm"
                                placeholder="Nhập mô tả phim..."
                            />
                            {errors.description && <p className="text-xs text-rose-500 font-bold mt-1 ml-1">{String(errors.description.message)}</p>}
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
