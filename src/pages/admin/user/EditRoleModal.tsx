import React, { useState, useEffect } from 'react';
import { Shield, ShieldCheck, User as UserIcon, CheckCircle2, Loader2, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ModalCustom from '../../../components/common/Modal';
import type { EditRoleModalProps } from '../../../types/auth.types';

const EditRoleModal: React.FC<EditRoleModalProps> = ({ isOpen, onClose, editingUser, onRoleChange, isLoading }) => {
    const [selectedRole, setSelectedRole] = useState<string>('');

    useEffect(() => {
        if (editingUser?.role) {
            setSelectedRole(editingUser.role);
        }
    }, [editingUser, isOpen]);

    if (!isOpen) return null;

    const hasChanged = selectedRole !== editingUser?.role;

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
                    {[
                        { id: 'ADMIN', label: 'Quản trị viên', desc: 'Toàn quyền truy cập', icon: ShieldCheck, color: 'purple' },
                        { id: 'EMPLOYEE', label: 'Nhân viên', desc: 'Quyền hạn chế', icon: UserIcon, color: 'indigo' },
                    ].map((role) => {
                        const Icon = role.icon;
                        const isSelected = selectedRole === role.id;
                        const isCurrent = editingUser?.role === role.id;

                        const colors = {
                            purple: 'bg-purple-50 border-purple-500 shadow-purple-600/10 text-purple-600',
                            indigo: 'bg-indigo-50 border-indigo-500 shadow-indigo-600/10 text-indigo-600',
                            emerald: 'bg-emerald-50 border-emerald-500 shadow-emerald-600/10 text-emerald-600',
                        }[role.color as 'purple' | 'indigo' | 'emerald'];

                        const iconColors = {
                            purple: 'bg-purple-500',
                            indigo: 'bg-indigo-500',
                            emerald: 'bg-emerald-500',
                        }[role.color as 'purple' | 'indigo' | 'emerald'];

                        return (
                            <motion.button
                                key={role.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedRole(role.id)}
                                className={`flex items-center justify-between p-5 rounded-[1.8rem] border-2 transition-all relative overflow-hidden ${isSelected
                                    ? `${colors} shadow-xl`
                                    : 'bg-slate-50 border-transparent hover:border-slate-200'
                                    }`}
                            >
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className={`p-2.5 rounded-2xl transition-all ${isSelected ? `${iconColors} text-white shadow-lg` : 'bg-white text-slate-400 group-hover:text-slate-600'}`}>
                                        <Icon size={20} strokeWidth={2.5} />
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <p className="font-black text-sm text-slate-900">{role.label}</p>
                                            {isCurrent && (
                                                <span className="text-[8px] font-black bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded-md uppercase tracking-tighter">Hiện tại</span>
                                            )}
                                        </div>
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{role.desc}</p>
                                    </div>
                                </div>
                                <AnimatePresence>
                                    {isSelected && (
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                        >
                                            <CheckCircle2 size={24} className={colors.split(' ').pop()} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        );
                    })}
                </div>

                <div className="flex flex-col gap-3">
                    <motion.button
                        whileHover={hasChanged && !isLoading ? { scale: 1.02, y: -2 } : {}}
                        whileTap={hasChanged && !isLoading ? { scale: 0.98 } : {}}
                        disabled={!hasChanged || isLoading}
                        onClick={() => onRoleChange(selectedRole)}
                        className={`w-full py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl ${hasChanged && !isLoading
                            ? 'bg-indigo-600 text-white shadow-indigo-200'
                            : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
                            }`}
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                <Save size={18} />
                                Lưu Thay Đổi
                            </>
                        )}
                    </motion.button>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="w-full py-4 text-slate-400 hover:text-slate-900 font-bold text-xs uppercase tracking-widest transition-all rounded-2xl hover:bg-slate-50 disabled:opacity-50"
                    >
                        Hủy Bỏ
                    </button>
                </div>
            </div>
        </ModalCustom>
    );
};

export default EditRoleModal;
