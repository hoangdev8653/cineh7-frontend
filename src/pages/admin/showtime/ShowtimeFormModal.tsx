import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Plus, AlertCircle, ChevronRight, Ticket } from 'lucide-react';
import ModalCustom from '../../../components/common/Modal';
import { showtimeSchema, type ShowtimeFormData } from '../../../schema/showtime';
import type { ShowtimeFormModalProps } from '../../../types/showtime.types';

const ShowtimeFormModal: React.FC<ShowtimeFormModalProps> = ({
    isOpen,
    onClose,
    editingShowtime,
    onSubmit,
    movies,
    rooms,
    theaters,
    isPending
}) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ShowtimeFormData>({
        resolver: zodResolver(showtimeSchema),
    });
    const [selectedTheaterId, setSelectedTheaterId] = React.useState<string>('');

    useEffect(() => {
        if (isOpen) {
            if (editingShowtime) {
                const room = rooms.find(r => r.id === editingShowtime.roomId);
                if (room) {
                    setSelectedTheaterId(room.theaterId);
                }
                reset({
                    movieId: editingShowtime.movieId,
                    roomId: editingShowtime.roomId,
                    startTime: editingShowtime.startTime.slice(0, 16),
                    price: Number(editingShowtime.price),
                });
            } else {
                setSelectedTheaterId('');
                reset({
                    movieId: '',
                    roomId: '',
                    startTime: '',
                    price: 100000,
                });
            }
        }
    }, [isOpen, editingShowtime, reset, rooms]);

    const filteredRooms = React.useMemo(() => {
        if (!selectedTheaterId) return [];
        return rooms.filter(r => r.theaterId === selectedTheaterId);
    }, [rooms, selectedTheaterId]);

    if (!isOpen) return null;

    return (
        <ModalCustom
            onClose={onClose}
            className="w-full max-w-2xl !bg-white !text-slate-900 border-none rounded-[3rem] p-0 overflow-hidden shadow-2xl"
        >
            <div className="p-10">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-center gap-5 mb-10"
                >
                    <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                        {editingShowtime ? <Edit size={30} strokeWidth={2.5} /> : <Plus size={30} strokeWidth={2.5} />}
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">{editingShowtime ? 'Chỉnh Sửa Lịch Chiếu' : 'Thêm Lịch Chiếu'}</h2>
                        <p className="text-slate-400 font-medium text-sm">Cấu hình phim, phòng và thời gian chiếu chính xác</p>
                    </div>
                </motion.div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Chọn Phim</label>
                            <div className="relative">
                                <select
                                    {...register('movieId')}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all appearance-none cursor-pointer font-bold text-slate-900"
                                >
                                    <option value="">Chọn một bộ phim</option>
                                    {movies?.data?.movie?.map((m: any) => (
                                        <option key={m.id} value={m.id}>{m.title}</option>
                                    ))}
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <ChevronRight size={16} className="rotate-90" />
                                </div>
                            </div>
                            {errors.movieId && <p className="text-[10px] text-rose-500 flex items-center gap-1.5 mt-1 font-black uppercase tracking-wider"><AlertCircle size={14} /> {errors.movieId.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Chọn Rạp Chiếu</label>
                            <div className="relative">
                                <select
                                    value={selectedTheaterId}
                                    onChange={(e) => {
                                        setSelectedTheaterId(e.target.value);
                                        reset((formValues) => ({ ...formValues, roomId: '' }));
                                    }}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all appearance-none cursor-pointer font-bold text-slate-900"
                                >
                                    <option value="">Chọn một rạp chiếu</option>
                                    {theaters?.data?.theater?.map((t: any) => (
                                        <option key={t.id} value={t.id}>{t.name}</option>
                                    ))}
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <ChevronRight size={16} className="rotate-90" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phòng Chiếu</label>
                            <div className="relative">
                                <select
                                    {...register('roomId')}
                                    disabled={!selectedTheaterId}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all appearance-none cursor-pointer font-bold text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <option value="">{selectedTheaterId ? "Chọn một phòng" : "Vui lòng chọn rạp trước"}</option>
                                    {filteredRooms?.map((r: any) => (
                                        <option key={r.id} value={r.id}>{r.name} - {r.type}</option>
                                    ))}
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <ChevronRight size={16} className="rotate-90" />
                                </div>
                            </div>
                            {errors.roomId && <p className="text-[10px] text-rose-500 flex items-center gap-1.5 mt-1 font-black uppercase tracking-wider"><AlertCircle size={14} /> {errors.roomId.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Thời Gian Bắt Đầu</label>
                            <input
                                type="datetime-local"
                                {...register('startTime')}
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all font-bold text-slate-900"
                            />
                            {errors.startTime && <p className="text-[10px] text-rose-500 mt-1 font-black uppercase tracking-wider">{errors.startTime.message}</p>}
                        </div>


                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Giá Vé (VNĐ)</label>
                        <div className="relative">
                            <Ticket className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} strokeWidth={2.5} />
                            <input
                                type="number"
                                {...register('price', { valueAsNumber: true })}
                                className="w-full bg-slate-50 border-none rounded-2xl pl-16 pr-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all font-black text-amber-600 text-lg"
                                placeholder="100,000"
                            />
                        </div>
                        {errors.price && <p className="text-[10px] text-rose-500 mt-1 font-black uppercase tracking-wider">{errors.price.message}</p>}
                    </div>

                    <div className="flex items-center gap-4 pt-8">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={onClose}
                            className="flex-1 cursor-pointer py-4 bg-slate-50 text-slate-400 hover:text-slate-900 font-black text-sm uppercase tracking-widest transition-all rounded-2xl"
                        >
                            Hủy Bỏ
                        </motion.button>
                        <motion.button
                            whileHover={!isPending ? { scale: 1.02, y: -2 } : {}}
                            whileTap={!isPending ? { scale: 0.98 } : {}}
                            type="submit"
                            disabled={isPending}
                            className="flex-1 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50 text-sm flex items-center justify-center gap-3 active:scale-[0.98]"
                        >
                            {isPending ? (
                                <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    {editingShowtime ? <Edit size={18} /> : <Ticket size={18} />}
                                    {editingShowtime ? 'Cập Nhật Lịch Chiếu' : 'Xác Nhận & Lên Lịch'}
                                </>
                            )}
                        </motion.button>
                    </div>
                </form>
            </div>
        </ModalCustom>
    );
};

export default ShowtimeFormModal;
