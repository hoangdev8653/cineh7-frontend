import React from 'react';
import { Shield, ShieldCheck, User as UserIcon, CheckCircle2 } from 'lucide-react';
import type { IUser } from '../../../../types/auth.types';
import ModalCustom from '../../../../components/common/Modal';

interface EditRoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingUser: IUser | null;
    onRoleChange: (role: string) => void;
}

const EditRoleModal: React.FC<EditRoleModalProps> = ({ isOpen, onClose, editingUser, onRoleChange }) => {
    if (!isOpen) return null;

    return (
        <ModalCustom onClose={onClose} className="w-[450px] !bg-white !text-slate-900 border-none rounded-[3rem] p-10 shadow-2xl">
            <div className="text-center">
                <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-indigo-100/50">
                    <Shield size={36} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black mb-3 tracking-tight">Quyền Truy Cập</h3>
                <p className="text-slate-400 font-medium text-sm mb-10 leading-relaxed px-4">
                    Chọn vai trò cho <span className="text-slate-900 font-black">{editingUser?.name || editingUser?.full_name}</span>.
                </p>

                <div className="grid grid-cols-1 gap-4 mb-10">
                    <button
                        onClick={() => onRoleChange('ADMIN')}
                        className={`flex items-center justify-between p-5 rounded-[1.5rem] border-2 transition-all ${editingUser?.role === 'ADMIN'
                            ? 'bg-purple-50 border-purple-500 shadow-lg shadow-purple-600/10'
                            : 'bg-slate-50 border-transparent hover:border-slate-200'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-xl ${editingUser?.role === 'ADMIN' ? 'bg-purple-500 text-white' : 'bg-white text-slate-400'}`}>
                                <ShieldCheck size={20} />
                            </div>
                            <div className="text-left">
                                <p className="font-black text-sm text-slate-900">Quản trị viên</p>
                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Toàn quyền truy cập</p>
                            </div>
                        </div>
                        {editingUser?.role === 'ADMIN' && <CheckCircle2 size={24} className="text-purple-600" />}
                    </button>

                    <button
                        onClick={() => onRoleChange('EMPLOYEE')}
                        className={`flex items-center justify-between p-5 rounded-[1.5rem] border-2 transition-all ${editingUser?.role === 'EMPLOYEE'
                            ? 'bg-indigo-50 border-indigo-500 shadow-lg shadow-indigo-600/10'
                            : 'bg-slate-50 border-transparent hover:border-slate-200'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-xl ${editingUser?.role === 'EMPLOYEE' ? 'bg-indigo-500 text-white' : 'bg-white text-slate-400'}`}>
                                <UserIcon size={20} />
                            </div>
                            <div className="text-left">
                                <p className="font-black text-sm text-slate-900">Nhân viên</p>
                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Quyền hạn chế</p>
                            </div>
                        </div>
                        {editingUser?.role === 'EMPLOYEE' && <CheckCircle2 size={24} className="text-indigo-600" />}
                    </button>
                    
                    <button
                        onClick={() => onRoleChange('USER')}
                        className={`flex items-center justify-between p-5 rounded-[1.5rem] border-2 transition-all ${editingUser?.role === 'USER'
                            ? 'bg-emerald-50 border-emerald-500 shadow-lg shadow-emerald-600/10'
                            : 'bg-slate-50 border-transparent hover:border-slate-200'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-xl ${editingUser?.role === 'USER' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400'}`}>
                                <UserIcon size={20} />
                            </div>
                            <div className="text-left">
                                <p className="font-black text-sm text-slate-900">Người dùng</p>
                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Quyền cơ bản</p>
                            </div>
                        </div>
                        {editingUser?.role === 'USER' && <CheckCircle2 size={24} className="text-emerald-600" />}
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="w-full py-4 bg-slate-50 text-slate-400 hover:text-slate-900 font-black text-sm uppercase tracking-widest transition-all rounded-2xl"
                >
                    Hủy Bỏ
                </button>
            </div>
        </ModalCustom>
    );
};

export default EditRoleModal;
