import React from 'react';
import { Mail, Shield, ShieldCheck, Trash2, User as UserIcon } from 'lucide-react';
import type { IUser } from '../../../types/auth.types';

interface UserTableProps {
    users: IUser[] | undefined;
    isLoading: boolean;
    onEditRole: (user: IUser) => void;
    onDeleteUser: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, isLoading, onEditRole, onDeleteUser }) => {
    return (
        <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50">
                        <tr>
                            <th className="px-8 py-6">Tài Khoản</th>
                            <th className="px-8 py-6">Địa Chỉ Email</th>
                            <th className="px-8 py-6">Vai Trò / Quyền</th>
                            <th className="px-8 py-6 text-right">Hành Động</th>
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
                        ) : users?.map((user: IUser) => (
                            <tr key={user.id} className="hover:bg-slate-50 transition-all group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200/50 shadow-sm group-hover:scale-105 transition-transform overflow-hidden font-black text-slate-400 text-lg">
                                            {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" alt="avatar" /> : (user.name || user.full_name || 'U').charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors capitalize leading-tight">{user.name || user.full_name}</p>
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
                                        {user.role === 'ADMIN' ? (
                                            <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-600 border border-purple-100 text-[10px] font-black uppercase tracking-widest">
                                                <ShieldCheck size={14} strokeWidth={2.5} />
                                                Quản trị viên
                                            </span>
                                        ) : user.role === 'EMPLOYEE' ? (
                                            <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] font-black uppercase tracking-widest">
                                                <UserIcon size={14} strokeWidth={2.5} />
                                                Nhân viên
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-black uppercase tracking-widest">
                                                <UserIcon size={14} strokeWidth={2.5} />
                                                Người dùng
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onEditRole(user)}
                                            className="p-2.5 bg-slate-50 hover:bg-indigo-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-sm"
                                            title="Change Permissions"
                                        >
                                            <Shield size={18} />
                                        </button>
                                        <button
                                            onClick={() => onDeleteUser(user.id)}
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
    );
};

export default UserTable;
