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
import type { ITheater, TheaterDto } from '../../../types/theater.types';
import ModalCustom from '../../../components/common/Modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const theaterSchema = z.object({
    name: z.string().min(1, 'Theater name is required'),
    address: z.string().min(1, 'Address is required'),
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
    email: z.string().email('Invalid email address'),
});

type TheaterFormData = z.infer<typeof theaterSchema>;

const Theater: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: theaters, isLoading } = useTheaters();
    const { createTheater, updateTheater, deleteTheater } = useTheaterMutations();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTheater, setEditingTheater] = useState<ITheater | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [theaterToDelete, setTheaterToDelete] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TheaterFormData>({
        resolver: zodResolver(theaterSchema),
    });

    const filteredTheaters = theaters?.filter((t: ITheater) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenAdd = () => {
        setEditingTheater(null);
        reset({
            name: '',
            address: '',
            phoneNumber: '',
            email: '',
        });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (theater: ITheater) => {
        setEditingTheater(theater);
        reset(theater);
        setIsModalOpen(true);
    };

    const onSubmit = (data: TheaterFormData) => {
        if (editingTheater) {
            updateTheater.mutate({ id: editingTheater.id, theaterDto: data }, {
                onSuccess: () => setIsModalOpen(false)
            });
        } else {
            createTheater.mutate(data, {
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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white uppercase tracking-tight">Theater Management</h1>
                    <p className="text-gray-400">Manage all cinema locations and contact details</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95 text-sm"
                >
                    <Plus size={18} />
                    Add New Theater
                </button>
            </div>

            {/* Search */}
            <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700 p-4 rounded-2xl">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search theaters by name or address..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white pl-12 pr-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600 text-sm"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-gray-800 border border-gray-700 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-900/60 text-gray-500 text-[10px] uppercase font-black tracking-[0.2em] border-b border-gray-700/50">
                            <tr>
                                <th className="px-8 py-5">Theater Name</th>
                                <th className="px-8 py-5">Address</th>
                                <th className="px-8 py-5">Contact</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/30">
                            {isLoading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={4} className="px-8 py-8 bg-gray-800/10"></td>
                                    </tr>
                                ))
                            ) : filteredTheaters?.map((theater: ITheater) => (
                                <tr key={theater.id} className="hover:bg-gray-700/20 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-blue-900/30 text-blue-400 flex items-center justify-center border border-blue-800/30 group-hover:scale-110 transition-transform">
                                                <TheaterIcon size={20} />
                                            </div>
                                            <span className="font-bold text-gray-200 group-hover:text-white transition-colors">{theater.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-gray-400 text-sm italic">
                                            <MapPin size={14} className="flex-shrink-0 text-rose-500 opacity-70" />
                                            <span className="truncate max-w-[300px]">{theater.address}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-gray-400 text-xs">
                                                <Phone size={12} className="text-emerald-500 opacity-70" />
                                                <span>{theater.phoneNumber}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500 text-xs">
                                                <Mail size={12} className="text-blue-500 opacity-70" />
                                                <span>{theater.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleOpenEdit(theater)}
                                                className="p-2 bg-gray-900/50 hover:bg-blue-600 hover:text-white text-blue-400 border border-gray-700 rounded-xl transition-all"
                                                title="Edit Theater"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setTheaterToDelete(theater.id);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="p-2 bg-gray-900/50 hover:bg-rose-600 hover:text-white text-rose-500 border border-gray-700 rounded-xl transition-all"
                                                title="Delete Theater"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!isLoading && filteredTheaters?.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center opacity-30">
                                            <TheaterIcon size={48} className="mb-4" />
                                            <p className="text-lg font-bold">No theaters found</p>
                                            <p className="text-sm">Try adjusting your search criteria</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Placeholder */}
            <div className="flex items-center justify-between px-2 text-gray-500 text-xs uppercase font-black tracking-widest">
                <span>Showing {filteredTheaters?.length || 0} locations</span>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:text-white transition-colors opacity-30 cursor-not-allowed"><ChevronLeft size={18} /></button>
                    <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">1</span>
                    <button className="p-2 hover:text-white transition-colors opacity-30 cursor-not-allowed"><ChevronRight size={18} /></button>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <ModalCustom
                    onClose={() => setIsModalOpen(false)}
                    className="w-full max-w-lg !bg-gray-800 !text-white border border-gray-700 shadow-2xl"
                >
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
                                {editingTheater ? <Edit size={24} /> : <Plus size={24} />}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{editingTheater ? 'Edit Theater' : 'Add New Theater'}</h2>
                                <p className="text-gray-400 text-xs">Enter the information for the cinema location</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Theater Name</label>
                                <input
                                    {...register('name')}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                                    placeholder="e.g., CineH7 District 1"
                                />
                                {errors.name && <p className="text-xs text-rose-500 flex items-center gap-1 mt-1"><AlertCircle size={12} /> {errors.name.message}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Detailed Address</label>
                                <textarea
                                    {...register('address')}
                                    rows={3}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700 resize-none"
                                    placeholder="Enter full street address, city..."
                                />
                                {errors.address && <p className="text-xs text-rose-500 flex items-center gap-1 mt-1"><AlertCircle size={12} /> {errors.address.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Phone Number</label>
                                    <input
                                        {...register('phoneNumber')}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                                        placeholder="0123 456 789"
                                    />
                                    {errors.phoneNumber && <p className="text-xs text-rose-500 mt-1">{errors.phoneNumber.message}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Contact Email</label>
                                    <input
                                        {...register('email')}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700"
                                        placeholder="theater@cineh7.com"
                                    />
                                    {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-700 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2.5 text-gray-500 hover:text-white font-bold transition-all text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createTheater.isPending || updateTheater.isPending}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 text-xs"
                                >
                                    {editingTheater ? 'Update Theater' : 'Confirm & Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </ModalCustom>
            )}

            {/* Delete Confirmation */}
            {isDeleteModalOpen && (
                <ModalCustom onClose={() => setIsDeleteModalOpen(false)} className="w-full max-w-sm !bg-gray-800 !text-white border border-gray-700 p-8 text-center">
                    <div className="w-16 h-16 bg-rose-900/30 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-rose-800/50">
                        <Trash2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Confirm Deletion</h3>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                        Are you sure you want to remove this theater from the system? This action cannot be undone.
                    </p>
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={handleDelete}
                            className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-900/20"
                        >
                            Yes, Delete
                        </button>
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="w-full py-3 text-gray-500 hover:text-white font-bold transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </ModalCustom>
            )}
        </div>
    );
};

export default Theater;
