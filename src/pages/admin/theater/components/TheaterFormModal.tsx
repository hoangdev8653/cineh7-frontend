import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Plus, AlertCircle } from 'lucide-react';
import ModalCustom from '../../../../components/common/Modal';
import type { ITheater, TheaterDto } from '../../../../types/theater.types';
import { theaterSchema } from '../../../../schema/theater';
import * as z from 'zod';

type TheaterFormData = z.infer<typeof theaterSchema>;

interface TheaterFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingTheater: ITheater | null;
    onSubmit: (data: TheaterDto) => void;
    systems: any[];
    isPending: boolean;
}

const TheaterFormModal: React.FC<TheaterFormModalProps> = ({
    isOpen,
    onClose,
    editingTheater,
    onSubmit,
    systems,
    isPending
}) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<TheaterFormData>({
        resolver: zodResolver(theaterSchema),
    });

    useEffect(() => {
        if (isOpen) {
            if (editingTheater) {
                reset({
                    name: editingTheater.name,
                    address: editingTheater.address,
                    location: editingTheater.location,
                    system_id: editingTheater.system_id,
                    logo: editingTheater.logo || '',
                });
            } else {
                reset({
                    name: '',
                    address: '',
                    location: '',
                    system_id: '',
                    logo: '',
                });
            }
        }
    }, [isOpen, editingTheater, reset]);

    const handleFormSubmit = (data: TheaterFormData) => {
        const dto: TheaterDto = {
            ...data,
            logo: data.logo || null
        };
        onSubmit(dto);
    };

    if (!isOpen) return null;

    return (
        <ModalCustom
            onClose={onClose}
            className="w-full max-w-lg !bg-white !text-slate-900 border-none rounded-[3rem] p-0 overflow-hidden shadow-2xl"
        >
            <div className="p-10">
                <div className="flex items-center gap-5 mb-10">
                    <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                        {editingTheater ? <Edit size={30} strokeWidth={2.5} /> : <Plus size={30} strokeWidth={2.5} />}
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">{editingTheater ? 'Cập Nhật Rạp' : 'Thêm Rạp Mới'}</h2>
                        <p className="text-slate-400 font-medium text-sm">Vui lòng điền đầy đủ thông tin bên dưới</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tên Rạp Chiếu</label>
                        <input
                            {...register('name')}
                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all placeholder:text-slate-300 font-bold"
                            placeholder="VD: CineH7 Hùng Vương"
                        />
                        {errors.name && <p className="text-[10px] text-rose-500 flex items-center gap-1.5 mt-1 font-black uppercase tracking-wider"><AlertCircle size={14} /> {errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Địa Chỉ Chi Tiết</label>
                        <textarea
                            {...register('address')}
                            rows={3}
                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all placeholder:text-slate-300 font-bold resize-none"
                            placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                        />
                        {errors.address && <p className="text-[10px] text-rose-500 flex items-center gap-1.5 mt-1 font-black uppercase tracking-wider"><AlertCircle size={14} /> {errors.address.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Thành Phố / Tỉnh</label>
                        <input
                            {...register('location')}
                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all placeholder:text-slate-300 font-bold"
                            placeholder="VD: Cần Thơ, Hồ Chí Minh..."
                        />
                        {errors.location && <p className="text-[10px] text-rose-500 flex items-center gap-1.5 mt-1 font-black uppercase tracking-wider"><AlertCircle size={14} /> {errors.location.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Hệ Thống Rạp</label>
                        <select
                            {...register('system_id')}
                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all font-bold appearance-none cursor-pointer"
                        >
                            <option value="">Chọn hệ thống rạp</option>
                            {systems.map((system: any) => (
                                <option key={system.id} value={system.id}>{system.name}</option>
                            ))}
                        </select>
                        {errors.system_id && <p className="text-[10px] text-rose-500 flex items-center gap-1.5 mt-1 font-black uppercase tracking-wider"><AlertCircle size={14} /> {errors.system_id.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">URL Logo (Tùy chọn)</label>
                        <input
                            {...register('logo')}
                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all placeholder:text-slate-300 font-bold"
                            placeholder="https://..."
                        />
                        {errors.logo && <p className="text-[10px] text-rose-500 mt-1 font-black uppercase tracking-wider">{errors.logo.message}</p>}
                    </div>

                    <div className="flex items-center gap-4 pt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 bg-slate-50 text-slate-400 hover:text-slate-900 font-black text-sm uppercase tracking-widest transition-all rounded-2xl"
                        >
                            Hủy Bỏ
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50 text-sm active:scale-[0.98]"
                        >
                            {editingTheater ? 'Cập Nhật Rạp' : 'Tạo Rạp Mới'}
                        </button>
                    </div>
                </form>
            </div>
        </ModalCustom>
    );
};

export default TheaterFormModal;
