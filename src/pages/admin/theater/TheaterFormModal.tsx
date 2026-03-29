import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Edit, Plus, AlertCircle, MapPin, Building2,
    Globe, Image, ChevronDown, Sparkles, Upload, X
} from 'lucide-react';
import ModalCustom from '../../../components/common/Modal';
import type { ITheater, TheaterDto } from '../../../types/theater.types';
import { theaterSchema } from '../../../schema/theater';
import * as z from 'zod';

type TheaterFormData = z.infer<typeof theaterSchema>;

interface TheaterFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingTheater: ITheater | null;
    onSubmit: (data: TheaterDto | FormData) => void;
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
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<TheaterFormData>({
        resolver: zodResolver(theaterSchema),
    });

    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const watchedSystemId = watch('system_id');

    const selectedSystem = systems.find((s: any) => s.id === watchedSystemId);

    useEffect(() => {
        if (isOpen) {
            setSelectedFile(null);
            if (editingTheater) {
                setLogoPreview(editingTheater.logo || null);
                reset({
                    name: editingTheater.name,
                    address: editingTheater.address,
                    location: editingTheater.location,
                    system_id: editingTheater.system_id,
                    logo: editingTheater.logo || '',
                });
            } else {
                setLogoPreview(null);
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setLogoPreview(editingTheater?.logo || null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleFormSubmit = (data: TheaterFormData) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('address', data.address);
        formData.append('location', data.location);
        formData.append('system_id', data.system_id);

        if (selectedFile) {
            formData.append('logo', selectedFile);
        }

        onSubmit(formData as any);
    };

    if (!isOpen) return null;

    const isEditing = !!editingTheater;

    return (
        <ModalCustom
            onClose={onClose}
            className={`w-full ${isEditing ? 'max-w-3xl' : 'max-w-lg'} !bg-white !text-slate-900 border-none rounded-[2rem] p-0 overflow-hidden shadow-2xl`}
        >
            {/* Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700" />
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full" />
                    <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white rounded-full" />
                </div>
                <div className="relative px-8 py-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white border border-white/20 shadow-lg">
                        {isEditing ? <Edit size={22} strokeWidth={2.5} /> : (
                            <div className="relative">
                                <Plus size={22} strokeWidth={2.5} />
                                <Sparkles size={10} className="absolute -top-1 -right-1 text-amber-300" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">
                            {isEditing ? 'Cập Nhật Rạp Chiếu' : 'Thêm Rạp Chiếu Mới'}
                        </h2>
                        <p className="text-indigo-200 text-sm font-medium">
                            {isEditing ? 'Chỉnh sửa thông tin rạp chiếu phim' : 'Điền thông tin để tạo rạp mới'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className={`p-8 ${isEditing ? 'flex gap-8' : ''}`}>
                {/* Logo Preview Panel - Only in edit mode */}
                {isEditing && (
                    <div className="w-56 flex-shrink-0 flex flex-col items-center gap-4">
                        <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden shadow-inner">
                            {logoPreview ? (
                                <img
                                    src={logoPreview}
                                    alt={editingTheater?.name}
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            ) : (
                                <div className="text-center p-4">
                                    <Image size={40} className="mx-auto text-slate-300 mb-2" />
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                                        Logo Preview
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* System badge */}
                        {selectedSystem && (
                            <div className="w-full bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 flex items-center gap-3 border border-indigo-100">
                                <div className="w-8 h-8 rounded-lg bg-white shadow-sm overflow-hidden flex-shrink-0 border border-slate-100">
                                    <img
                                        src={selectedSystem.logo}
                                        alt={selectedSystem.name}
                                        className="w-full h-full object-contain p-1"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-indigo-400">Hệ thống</p>
                                    <p className="text-xs font-bold text-slate-700 truncate">{selectedSystem.name}</p>
                                </div>
                            </div>
                        )}

                        {/* Theater info summary */}
                        {editingTheater && (
                            <div className="w-full bg-slate-50 rounded-xl p-3 space-y-2">
                                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Thông tin hiện tại</p>
                                <div className="flex items-start gap-2">
                                    <MapPin size={12} className="text-rose-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-[11px] text-slate-500 leading-relaxed">{editingTheater.location}</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Building2 size={12} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{editingTheater.address}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(handleFormSubmit)} className="flex-1 space-y-5">
                    {/* Tên rạp */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-1.5">
                            <Building2 size={12} />
                            Tên Rạp Chiếu
                        </label>
                        <div className="relative">
                            <input
                                {...register('name')}
                                className={`w-full bg-slate-50 border-2 ${errors.name ? 'border-rose-200 bg-rose-50/30' : 'border-transparent focus:border-indigo-200'} rounded-xl px-4 py-3 focus:ring-0 outline-none transition-all placeholder:text-slate-300 font-semibold text-sm`}
                                placeholder="VD: CineH7 Hùng Vương"
                            />
                        </div>
                        {errors.name && (
                            <p className="text-[10px] text-rose-500 flex items-center gap-1 ml-1 font-bold">
                                <AlertCircle size={12} /> {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Địa chỉ */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-1.5">
                            <MapPin size={12} />
                            Địa Chỉ Chi Tiết
                        </label>
                        <textarea
                            {...register('address')}
                            rows={2}
                            className={`w-full bg-slate-50 border-2 ${errors.address ? 'border-rose-200 bg-rose-50/30' : 'border-transparent focus:border-indigo-200'} rounded-xl px-4 py-3 focus:ring-0 outline-none transition-all placeholder:text-slate-300 font-semibold text-sm resize-none`}
                            placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                        />
                        {errors.address && (
                            <p className="text-[10px] text-rose-500 flex items-center gap-1 ml-1 font-bold">
                                <AlertCircle size={12} /> {errors.address.message}
                            </p>
                        )}
                    </div>

                    {/* Thành phố + Hệ thống - side by side */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-1.5">
                                <Globe size={12} />
                                Thành Phố / Tỉnh
                            </label>
                            <input
                                {...register('location')}
                                className={`w-full bg-slate-50 border-2 ${errors.location ? 'border-rose-200 bg-rose-50/30' : 'border-transparent focus:border-indigo-200'} rounded-xl px-4 py-3 focus:ring-0 outline-none transition-all placeholder:text-slate-300 font-semibold text-sm`}
                                placeholder="VD: Hồ Chí Minh"
                            />
                            {errors.location && (
                                <p className="text-[10px] text-rose-500 flex items-center gap-1 ml-1 font-bold">
                                    <AlertCircle size={12} /> {errors.location.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-1.5">
                                <Building2 size={12} />
                                Hệ Thống Rạp
                            </label>
                            <div className="relative">
                                <select
                                    {...register('system_id')}
                                    className={`w-full bg-slate-50 border-2 ${errors.system_id ? 'border-rose-200 bg-rose-50/30' : 'border-transparent focus:border-indigo-200'} rounded-xl px-4 py-3 focus:ring-0 outline-none transition-all font-semibold text-sm appearance-none cursor-pointer pr-10`}
                                >
                                    <option value="">Chọn hệ thống</option>
                                    {systems.map((system: any) => (
                                        <option key={system.id} value={system.id}>{system.name}</option>
                                    ))}
                                </select>
                                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                            {errors.system_id && (
                                <p className="text-[10px] text-rose-500 flex items-center gap-1 ml-1 font-bold">
                                    <AlertCircle size={12} /> {errors.system_id.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Logo File Upload */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-1.5">
                            <Image size={12} />
                            Logo Rạp
                            <span className="text-slate-300 normal-case tracking-normal font-medium">(tùy chọn)</span>
                        </label>

                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {/* Drop zone / file picker area */}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full bg-slate-50 border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 rounded-xl px-4 py-4 cursor-pointer transition-all group"
                        >
                            {selectedFile ? (
                                <div className="flex items-center gap-3">
                                    {logoPreview && (
                                        <img
                                            src={logoPreview}
                                            alt="Preview"
                                            className="w-10 h-10 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-700 truncate">{selectedFile.name}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">
                                            {(selectedFile.size / 1024).toFixed(1)} KB
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveFile();
                                        }}
                                        className="p-1.5 hover:bg-rose-100 text-slate-400 hover:text-rose-500 rounded-lg transition-all flex-shrink-0"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-indigo-100 group-hover:bg-indigo-200 rounded-lg flex items-center justify-center transition-colors flex-shrink-0">
                                        <Upload size={18} className="text-indigo-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-500 group-hover:text-indigo-600 transition-colors">
                                            Nhấn để chọn ảnh logo
                                        </p>
                                        <p className="text-[10px] text-slate-400 font-medium">PNG, JPG, WEBP (tối đa 5MB)</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Current logo hint for edit mode */}
                        {isEditing && !selectedFile && editingTheater?.logo && (
                            <p className="text-[10px] text-slate-400 ml-1 font-medium flex items-center gap-1">
                                <Image size={10} />
                                Đang sử dụng logo hiện tại. Chọn ảnh mới để thay thế.
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 font-bold text-sm rounded-xl transition-all"
                        >
                            Hủy Bỏ
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-[2] bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/25 disabled:opacity-50 text-sm active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {isPending ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    {isEditing ? <Edit size={16} /> : <Plus size={16} />}
                                    {isEditing ? 'Cập Nhật Rạp' : 'Tạo Rạp Mới'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </ModalCustom>
    );
};

export default TheaterFormModal;
