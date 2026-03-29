import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { useUsers, useUserMutations } from '../../../hooks/useUser';
import type { IUser } from '../../../types/auth.types';
import UserTable from './UserTable';
import EditRoleModal from './EditRoleModal';
import DeleteUserModal from './DeleteUserModal';
import UserPagination from './UserPagination';

const User: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<'ALL' | 'ADMIN' | 'EMPLOYEE' | 'USER'>('ALL');
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: users, isLoading } = useUsers(searchQuery);
    const { updateUser, deleteUser } = useUserMutations();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<IUser | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    // Reset page to 1 when search or filter changes
    useEffect(() => {
        setPage(1);
    }, [searchQuery, roleFilter]);

    const filteredUsers = users?.filter((user: IUser) => {
        if (roleFilter === 'ALL') return true;
        return user.role === roleFilter;
    });

    const totalUsers = filteredUsers?.length || 0;
    const startIndex = (page - 1) * limit;
    const paginatedUsers = filteredUsers?.slice(startIndex, startIndex + limit);

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
                onSuccess: () => {
                    setIsDeleteModalOpen(false);
                    // Prevent page from being out of bounds after deletion
                    if (paginatedUsers?.length === 1 && page > 1) {
                        setPage(page - 1);
                    }
                }
            });
        }
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Quản Lý Tài Khoản</h1>
                    <p className="text-slate-400 font-medium mt-1">Quản lý người dùng hệ thống và quyền truy cập của họ</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="px-5 py-1.5 border-r border-slate-50">
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Tổng người dùng</p>
                        <p className="text-xl font-black text-indigo-600 leading-tight">{users?.length || 0}</p>
                    </div>
                    <div className="px-5 py-1.5">
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Quản trị viên</p>
                        <p className="text-xl font-black text-purple-600 leading-tight">{users?.filter((u: IUser) => u.role === 'ADMIN').length || 0}</p>
                    </div>
                </div>
            </div>

            {/* Controls Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm người dùng theo tên hoặc email..."
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
                        <option value="ALL">Tất cả vai trò</option>
                        <option value="ADMIN">Quản trị viên</option>
                        <option value="EMPLOYEE">Nhân viên</option>
                        <option value="USER">Người dùng</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="flex flex-col gap-4">
                <UserTable
                    users={paginatedUsers}
                    isLoading={isLoading}
                    onEditRole={(user) => {
                        setEditingUser(user);
                        setIsEditModalOpen(true);
                    }}
                    onDeleteUser={(id) => {
                        setUserToDelete(id);
                        setIsDeleteModalOpen(true);
                    }}
                />
                {!isLoading && totalUsers > limit && (
                    <UserPagination
                        page={page}
                        limit={limit}
                        totalUsers={totalUsers}
                        onPageChange={setPage}
                    />
                )}
            </div>

            {/* Edit Role Modal */}
            <EditRoleModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                editingUser={editingUser}
                onRoleChange={handleRoleChange}
            />

            {/* Delete Confirmation */}
            <DeleteUserModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default User;