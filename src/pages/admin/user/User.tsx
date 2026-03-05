import React, { useState } from 'react';
import {
    Search,
    Filter,
    Trash2,
    Mail,
    User as UserIcon,
    Shield,
    ShieldCheck,
    CheckCircle2,
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
        <div className="space-y-8 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Accounts Management</h1>
                    <p className="text-slate-400 font-medium mt-1">Manage system users and their access levels reliably</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="px-5 py-1.5 border-r border-slate-50">
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Total Users</p>
                        <p className="text-xl font-black text-indigo-600 leading-tight">{users?.length || 0}</p>
                    </div>
                    <div className="px-5 py-1.5">
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Admins</p>
                        <p className="text-xl font-black text-purple-600 leading-tight">{users?.filter((u: IUser) => u.role === 'admin').length || 0}</p>
                    </div>
                </div>
            </div>

            {/* Controls Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search users by name or email address..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border-none text-slate-900 pl-14 pr-6 py-4 rounded-[2rem] shadow-sm focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all placeholder:text-slate-400 font-medium"
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value as any)}
                        className="w-full bg-white border-none text-slate-900 pl-14 pr-6 py-4 rounded-[2rem] shadow-sm focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all cursor-pointer appearance-none font-bold text-sm"
                    >
                        <option value="ALL">All Roles</option>
                        <option value="user">Standard Users</option>
                        <option value="admin">Administrators</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50">
                            <tr>
                                <th className="px-8 py-6">User Account</th>
                                <th className="px-8 py-6">Email Address</th>
                                <th className="px-8 py-6">Role / Access</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                Array(6).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={4} className="px-8 py-8 h-24">
                                            <div className="flex items-center gap-4">
                                                <div className="w-11 h-11 bg-slate-100 rounded-2xl"></div>
                                                <div className="space-y-2 flex-1">
                                                    <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                                                    <div className="h-3 bg-slate-100 rounded w-1/6"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : filteredUsers?.map((user: IUser) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200/50 shadow-sm group-hover:scale-105 transition-transform overflow-hidden font-black text-slate-400 text-lg">
                                                {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.full_name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors capitalize leading-tight">{user.full_name}</p>
                                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">ID: {user.id.slice(0, 8)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                                            <Mail size={16} className="text-slate-300" />
                                            <span className="text-sm">{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            {user.role === 'admin' ? (
                                                <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-600 border border-purple-100 text-[10px] font-black uppercase tracking-widest">
                                                    <ShieldCheck size={14} strokeWidth={2.5} />
                                                    Admin
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] font-black uppercase tracking-widest">
                                                    <UserIcon size={14} strokeWidth={2.5} />
                                                    User
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => {
                                                    setEditingUser(user);
                                                    setIsEditModalOpen(true);
                                                }}
                                                className="p-2.5 bg-slate-50 hover:bg-indigo-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-sm"
                                                title="Change Permissions"
                                            >
                                                <Shield size={18} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setUserToDelete(user.id);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="p-2.5 bg-slate-50 hover:bg-rose-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-sm"
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
                <ModalCustom onClose={() => setIsEditModalOpen(false)} className="w-[450px] !bg-white !text-slate-900 border-none rounded-[3rem] p-10 shadow-2xl">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-indigo-100/50">
                            <Shield size={36} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-2xl font-black mb-3 tracking-tight">Permissions</h3>
                        <p className="text-slate-400 font-medium text-sm mb-10 leading-relaxed px-4">
                            Select role for <span className="text-slate-900 font-black">{editingUser?.full_name}</span>.
                        </p>

                        <div className="grid grid-cols-1 gap-4 mb-10">
                            <button
                                onClick={() => handleRoleChange('admin')}
                                className={`flex items-center justify-between p-5 rounded-[1.5rem] border-2 transition-all ${editingUser?.role === 'admin'
                                    ? 'bg-purple-50 border-purple-500 shadow-lg shadow-purple-600/10'
                                    : 'bg-slate-50 border-transparent hover:border-slate-200'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-xl ${editingUser?.role === 'admin' ? 'bg-purple-500 text-white' : 'bg-white text-slate-400'}`}>
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-black text-sm text-slate-900">Administrator</p>
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Full Access</p>
                                    </div>
                                </div>
                                {editingUser?.role === 'admin' && <CheckCircle2 size={24} className="text-purple-600" />}
                            </button>

                            <button
                                onClick={() => handleRoleChange('user')}
                                className={`flex items-center justify-between p-5 rounded-[1.5rem] border-2 transition-all ${editingUser?.role === 'user'
                                    ? 'bg-indigo-50 border-indigo-500 shadow-lg shadow-indigo-600/10'
                                    : 'bg-slate-50 border-transparent hover:border-slate-200'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-xl ${editingUser?.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-white text-slate-400'}`}>
                                        <UserIcon size={20} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-black text-sm text-slate-900">Standard User</p>
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Restricted Access</p>
                                    </div>
                                </div>
                                {editingUser?.role === 'user' && <CheckCircle2 size={24} className="text-indigo-600" />}
                            </button>
                        </div>

                        <button
                            onClick={() => setIsEditModalOpen(false)}
                            className="w-full py-4 bg-slate-50 text-slate-400 hover:text-slate-900 font-black text-sm uppercase tracking-widest transition-all rounded-2xl"
                        >
                            Cancel
                        </button>
                    </div>
                </ModalCustom>
            )}

            {/* Delete Confirmation */}
            {isDeleteModalOpen && (
                <ModalCustom onClose={() => setIsDeleteModalOpen(false)} className="w-[450px] !bg-white !text-slate-900 border-none rounded-[3rem] p-10 shadow-2xl">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-rose-100/50">
                            <Trash2 size={36} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-2xl font-black mb-3 tracking-tight">Delete account?</h3>
                        <p className="text-slate-400 font-medium text-sm mb-10 leading-relaxed px-4">
                            You are about to permanently delete this user account. This action is terminal and cannot be undone.
                        </p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleDelete}
                                className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-600/20 text-sm"
                            >
                                Confirm Delete
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="w-full py-4 bg-slate-50 text-slate-400 hover:text-slate-900 font-black text-sm uppercase tracking-widest transition-all rounded-2xl"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </ModalCustom>
            )}
        </div>
    );
};

export default User;