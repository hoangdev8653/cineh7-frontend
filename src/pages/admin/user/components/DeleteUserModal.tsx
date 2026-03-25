import React from 'react';
import { Trash2 } from 'lucide-react';
import ModalCustom from '../../../../components/common/Modal';

interface DeleteUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <ModalCustom onClose={onClose} className="w-[450px] !bg-white !text-slate-900 border-none rounded-[3rem] p-10 shadow-2xl">
            <div className="text-center">
                <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-rose-100/50">
                    <Trash2 size={36} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black mb-3 tracking-tight">Xóa tài khoản?</h3>
                <p className="text-slate-400 font-medium text-sm mb-10 leading-relaxed px-4">
                    Bạn sắp xóa vĩnh viễn tài khoản người dùng này. Hành động này không thể hoàn tác.
                </p>
                <div className="flex flex-col gap-3">
                    <button
                        onClick={onConfirm}
                        className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-600/20 text-sm"
                    >
                        Xác Nhận Xóa
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-slate-50 text-slate-400 hover:text-slate-900 font-black text-sm uppercase tracking-widest transition-all rounded-2xl"
                    >
                        Quay Lại
                    </button>
                </div>
            </div>
        </ModalCustom>
    );
};

export default DeleteUserModal;
