import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Plus,
    Edit,
    Trash2,
    MapPin,
    Phone,
    Mail,
    Theater as TheaterIcon,
    AlertCircle,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useTheaters, useTheaterMutations } from '../../../hooks/useTheater';
import type { ITheater } from '../../../types/theater.types';
import ModalCustom from '../../../components/common/Modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTheaterSystems } from '../../../hooks/useTheaterSystem';

const theaterSchema = z.object({
    name: z.string().min(1, 'Theater name is required'),
    address: z.string().min(1, 'Address is required'),
    location: z.string().min(1, 'Location is required'),
    system_id: z.string().min(1, 'Theater system is required'),
    image_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type TheaterFormData = z.infer<typeof theaterSchema>;

const Theater: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: theatersData, isLoading } = useTheaters();
    const { data: systemsData } = useTheaterSystems();
    const { createTheater, updateTheater, deleteTheater } = useTheaterMutations();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTheater, setEditingTheater] = useState<ITheater | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [theaterToDelete, setTheaterToDelete] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TheaterFormData>({
        resolver: zodResolver(theaterSchema),
    });

    const theaters = theatersData?.data || [];
    const systems = systemsData?.data || [];

    const filteredTheaters = theaters.filter((t: ITheater) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenAdd = () => {
        setEditingTheater(null);
        reset({
            name: '',
            address: '',
            location: '',
            system_id: '',
            image_url: '',
        });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (theater: ITheater) => {
        setEditingTheater(theater);
        reset({
            name: theater.name,
            address: theater.address,
            location: theater.location,
            system_id: theater.system_id,
            image_url: theater.image_url || '',
        });
        setIsModalOpen(true);
    };

    const onSubmit = (data: TheaterFormData) => {
        const dto: TheaterDto = {
            ...data,
            image_url: data.image_url || null
        };

        if (editingTheater) {
            updateTheater.mutate({ id: editingTheater.id, theaterDto: dto }, {
                onSuccess: () => setIsModalOpen(false)
            });
        } else {
            createTheater.mutate(dto, {
                onSuccess: () => setIsModalOpen(false)
            });
        }
    };

    const handleDelete = () => {
        if (theaterToDelete) {
            deleteTheater.mutate(theaterToDelete, {
                onSuccess: () => setIsDeleteModalOpen(false)
            });
        }
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Theater Management</h1>
                    <p className="text-slate-400 font-medium mt-1">Manage all cinema locations and contact details seamlessly</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3.5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20 active:scale-95 text-xs"
                >
                    <Plus size={18} strokeWidth={3} />
                    Add New Theater
                </button>
            </div>

            {/* Search */}
            <div className="bg-white border border-slate-100 p-2 rounded-[2rem] shadow-sm flex items-center pr-4">
                <div className="relative flex-1">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search theaters by name or address location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent text-slate-900 pl-16 pr-6 py-4 rounded-xl outline-none transition-all placeholder:text-slate-400 font-medium"
                    />
                </div>
                <div className="h-10 w-[1px] bg-slate-100 mx-2 hidden md:block"></div>
                <div className="hidden md:flex items-center gap-3 px-4">
                    <TheaterIcon size={18} className="text-indigo-600" />
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Cinema Facilities</span>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50">
                            <tr>
                                <th className="px-8 py-6">Theater Name</th>
                                <th className="px-8 py-6">Detailed Address</th>
                                <th className="px-8 py-6">Location</th>
                                <th className="px-8 py-6">System</th>
                                <th className="px-8 py-6 text-right">Actions</th>
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
                            ) : filteredTheaters?.map((theater: ITheater) => (
                                <tr key={theater.id} className="hover:bg-slate-50 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/50 group-hover:scale-105 transition-transform shadow-sm">
                                                <TheaterIcon size={22} strokeWidth={2.5} />
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
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-tighter">
                                                {theater.location}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 shadow-sm overflow-hidden flex-shrink-0">
                                                <img src={theater.system?.logo} alt={theater.system?.name} className="w-full h-full object-contain p-1" />
                                            </div>
                                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">{theater.system?.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                                            <button
                                                onClick={() => handleOpenEdit(theater)}
                                                className="p-2.5 bg-slate-50 hover:bg-indigo-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-sm"
                                                title="Edit Theater"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setTheaterToDelete(theater.id);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="p-2.5 bg-slate-50 hover:bg-rose-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-sm"
                                                title="Delete Theater"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!isLoading && filteredTheaters?.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-24 text-center">
                                        <div className="flex flex-col items-center opacity-20">
                                            <TheaterIcon size={64} className="mb-6 stroke-[1.5]" />
                                            <p className="text-xl font-black uppercase tracking-widest">No results found</p>
                                            <p className="text-sm font-medium">Try broadening your search term</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Placeholder */}
            <div className="flex flex-col md:flex-row items-center justify-between px-6 py-2 gap-4">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                    Showing <span className="text-slate-900">{theaters.length}</span> of <span className="text-slate-900">{theatersData?.total || 0}</span> strategic locations
                </p>
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                    <button
                        className="p-2 text-slate-300 hover:text-slate-900 transition-colors disabled:opacity-20"
                        disabled={theatersData?.page === 1}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: theatersData?.totalPage || 1 }, (_, i) => (
                            <button
                                key={i + 1}
                                className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black transition-all ${theatersData?.page === i + 1
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                    : 'text-slate-400 hover:bg-slate-50'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        className="p-2 text-slate-300 hover:text-slate-900 transition-colors disabled:opacity-20"
                        disabled={theatersData?.page === theatersData?.totalPage}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <ModalCustom
                    onClose={() => setIsModalOpen(false)}
                    className="w-full max-w-lg !bg-white !text-slate-900 border-none rounded-[3rem] p-0 overflow-hidden shadow-2xl"
                >
                    <div className="p-10">
                        <div className="flex items-center gap-5 mb-10">
                            <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                                {editingTheater ? <Edit size={30} strokeWidth={2.5} /> : <Plus size={30} strokeWidth={2.5} />}
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tight">{editingTheater ? 'Revise Theater' : 'Add Theater'}</h2>
                                <p className="text-slate-400 font-medium text-sm">Fill in the mandatory location credentials</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Identity Designation</label>
                                <input
                                    {...register('name')}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all placeholder:text-slate-300 font-bold"
                                    placeholder="e.g., CineH7 Global Center"
                                />
                                {errors.name && <p className="text-[10px] text-rose-500 flex items-center gap-1.5 mt-1 font-black uppercase tracking-wider"><AlertCircle size={14} /> {errors.name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Geographic Location</label>
                                <textarea
                                    {...register('address')}
                                    rows={3}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all placeholder:text-slate-300 font-bold resize-none"
                                    placeholder="Detailed street address, district, state..."
                                />
                                {errors.address && <p className="text-[10px] text-rose-500 flex items-center gap-1.5 mt-1 font-black uppercase tracking-wider"><AlertCircle size={14} /> {errors.address.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Geographic State / City</label>
                                <input
                                    {...register('location')}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all placeholder:text-slate-300 font-bold"
                                    placeholder="e.g., Cần Thơ, Hồ Chí Minh..."
                                />
                                {errors.location && <p className="text-[10px] text-rose-500 flex items-center gap-1.5 mt-1 font-black uppercase tracking-wider"><AlertCircle size={14} /> {errors.location.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Cinema System Access</label>
                                <select
                                    {...register('system_id')}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all font-bold appearance-none cursor-pointer"
                                >
                                    <option value="">Select a system</option>
                                    {systems.map((system: any) => (
                                        <option key={system.id} value={system.id}>{system.name}</option>
                                    ))}
                                </select>
                                {errors.system_id && <p className="text-[10px] text-rose-500 flex items-center gap-1.5 mt-1 font-black uppercase tracking-wider"><AlertCircle size={14} /> {errors.system_id.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Visual Asset URL (Optional)</label>
                                <input
                                    {...register('image_url')}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all placeholder:text-slate-300 font-bold"
                                    placeholder="https://..."
                                />
                                {errors.image_url && <p className="text-[10px] text-rose-500 mt-1 font-black uppercase tracking-wider">{errors.image_url.message}</p>}
                            </div>

                            <div className="flex items-center gap-4 pt-8">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4 bg-slate-50 text-slate-400 hover:text-slate-900 font-black text-sm uppercase tracking-widest transition-all rounded-2xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createTheater.isPending || updateTheater.isPending}
                                    className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50 text-sm active:scale-[0.98]"
                                >
                                    {editingTheater ? 'Save Changes' : 'Create Theater'}
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
                    <h3 className="text-2xl font-black mb-3 tracking-tight">Final deletion?</h3>
                    <p className="text-slate-400 font-medium text-sm mb-10 leading-relaxed px-4">
                        You are about to permanently remove this location from the infrastructure. This action is <span className="text-rose-600">irreversible</span>.
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
                            Keep Facility
                        </button>
                    </div>
                </ModalCustom>
            )}
        </div>
    );
};

export default Theater;
