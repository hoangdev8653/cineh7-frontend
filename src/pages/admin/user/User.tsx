import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    Edit,
    Trash2,
    Mail,
    User as UserIcon,
    Shield,
    ShieldCheck,
    CheckCircle2,
    XCircle,
    MoreVertical
} from 'lucide-react';
import { useUsers, useUserMutations } from '../../../hooks/useUser';
import type { IUser } from '../../../types/auth.types';
import ModalCustom from '../../../components/common/Modal';

const User: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<'ALL' | 'admin' | 'user'>('ALL');
    const { data: users, isLoading } = useUsers(searchQuery);
    const { updateUser, deleteUser } = useUserMutations();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<IUser | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    const filteredUsers = users?.filter((user: IUser) => {
        if (roleFilter === 'ALL') return true;
        return user.role === roleFilter;
    });

    const handleRoleChange = (role: string) => {
        if (editingUser) {
            updateUser.mutate({ id: editingUser.id, userDto: { role } }, {
                onSuccess: () => setIsEditModalOpen(false)
            });
        }
    };

    const handleDelete = () => {
        if (userToDelete) {
            deleteUser.mutate(userToDelete, {
                onSuccess: () => setIsDeleteModalOpen(false)
            });
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white uppercase tracking-tight">Accounts Management</h1>
                    <p className="text-gray-400">Manage system users and their access levels</p>
                </div>
                <div className="flex items-center gap-3 bg-gray-800/40 p-1 rounded-xl border border-gray-700">
                    <div className="px-4 py-2 border-r border-gray-700">
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Total Users</p>
                        <p className="text-lg font-bold text-blue-400">{users?.length || 0}</p>
                    </div>
                    <div className="px-4 py-2">
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Admins</p>
                        <p className="text-lg font-bold text-purple-400">{users?.filter((u: IUser) => u.role === 'admin').length || 0}</p>
                    </div>
                </div>
            </div>

            {/* Controls Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-white pl-12 pr-4 py-3 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600"
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value as any)}
                        className="w-full bg-gray-800 border border-gray-700 text-white pl-12 pr-4 py-3 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer appearance-none"
                    >
                        <option value="ALL">All Roles</option>
                        <option value="user">Standard Users</option>
                        <option value="admin">Administrators</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-gray-800 border border-gray-700 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-900/40 text-gray-500 text-[10px] uppercase font-black tracking-[0.2em] border-b border-gray-700/50">
                            <tr>
                                <th className="px-8 py-5">User Account</th>
                                <th className="px-8 py-5">Email Address</th>
                                <th className="px-8 py-5">Role / Access</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/30">
                            {isLoading ? (
                                Array(6).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={4} className="px-8 py-8 h-20 bg-gray-800/10"></td>
                                    </tr>
                                ))
                            ) : filteredUsers?.map((user: IUser) => (
                                <tr key={user.id} className="hover:bg-gray-700/20 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center border border-gray-600 shadow-inner group-hover:scale-105 transition-transform overflow-hidden font-bold text-gray-400">
                                                {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.fullName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-200 group-hover:text-white transition-colors capitalize">{user.fullName}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">ID: {user.id.slice(0, 8)}...</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Mail size={14} className="opacity-50" />
                                            <span className="text-sm">{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            {user.role === 'admin' ? (
                                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900/30 text-purple-400 border border-purple-800/50 text-[10px] font-black uppercase tracking-wider">
                                                    <ShieldCheck size={14} />
                                                    Administrator
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-900/30 text-blue-400 border border-blue-800/50 text-[10px] font-black uppercase tracking-wider">
                                                    <UserIcon size={14} />
                                                    Standard User
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => {
                                                    setEditingUser(user);
                                                    setIsEditModalOpen(true);
                                                }}
                                                className="p-2.5 bg-gray-900/50 hover:bg-blue-600 hover:text-white text-blue-400 border border-gray-700 hover:border-blue-500 rounded-xl transition-all shadow-sm"
                                                title="Change Permissions"
                                            >
                                                <Shield size={18} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setUserToDelete(user.id);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="p-2.5 bg-gray-900/50 hover:bg-rose-600 hover:text-white text-rose-500 border border-gray-700 hover:border-rose-500 rounded-xl transition-all shadow-sm"
                                                title="Delete Account"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Role Modal */}
            {isEditModalOpen && (
                <ModalCustom onClose={() => setIsEditModalOpen(false)} className="w-[450px] !bg-gray-800 !text-white border border-gray-700 p-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-900/30 text-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-800/50">
                            <Shield size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Update User Permissions</h3>
                        <p className="text-gray-400 text-sm mb-8">
                            Select the new role for <span className="text-white font-bold">{editingUser?.fullName}</span>.
                            This will change their access levels across the system.
                        </p>

                        <div className="grid grid-cols-1 gap-3 mb-8">
                            <button
                                onClick={() => handleRoleChange('admin')}
                                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${editingUser?.role === 'admin'
                                        ? 'bg-purple-900/40 border-purple-500 shadow-lg shadow-purple-900/20'
                                        : 'bg-gray-900 border-gray-700 hover:border-gray-500'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className={editingUser?.role === 'admin' ? 'text-purple-400' : 'text-gray-500'} />
                                    <div className="text-left">
                                        <p className="font-bold text-sm">Administrator</p>
                                        <p className="text-[10px] text-gray-500">Full system access and control</p>
                                    </div>
                                </div>
                                {editingUser?.role === 'admin' && <CheckCircle2 size={20} className="text-purple-500" />}
                            </button>

                            <button
                                onClick={() => handleRoleChange('user')}
                                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${editingUser?.role === 'user'
                                        ? 'bg-blue-900/40 border-blue-500 shadow-lg shadow-blue-900/20'
                                        : 'bg-gray-900 border-gray-700 hover:border-gray-500'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <UserIcon className={editingUser?.role === 'user' ? 'text-blue-400' : 'text-gray-500'} />
                                    <div className="text-left">
                                        <p className="font-bold text-sm">Standard User</p>
                                        <p className="text-[10px] text-gray-500">Regular booking access only</p>
                                    </div>
                                </div>
                                {editingUser?.role === 'user' && <CheckCircle2 size={20} className="text-blue-500" />}
                            </button>
                        </div>

                        <button
                            onClick={() => setIsEditModalOpen(false)}
                            className="w-full py-3 text-gray-500 hover:text-white font-bold transition-all"
                        >
                            Cancel and Close
                        </button>
                    </div>
                </ModalCustom>
            )}

            {/* Delete Confirmation */}
            {isDeleteModalOpen && (
                <ModalCustom onClose={() => setIsDeleteModalOpen(false)} className="w-[400px] !bg-gray-800 !text-white border border-gray-700 p-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-rose-900/30 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-rose-800/50">
                            <XCircle size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Permanently Delete?</h3>
                        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                            Are you sure you want to delete this user account? This action is <span className="text-white font-bold underline">irreversible</span> and will remove all their data.
                        </p>
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={handleDelete}
                                className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-rose-900/20"
                            >
                                Delete Account
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="w-full py-3 text-gray-500 hover:text-white font-bold transition-all"
                            >
                                Keep User
                            </button>
                        </div>
                    </div>
                </ModalCustom>
            )}
        </div>
    );
};

export default User;