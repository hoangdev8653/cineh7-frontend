import React from 'react';
import { Trash2 } from 'lucide-react';
import ModalCustom from '../../../../components/common/Modal';

interface DeleteMovieModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isPending: boolean;
}

const DeleteMovieModal: React.FC<DeleteMovieModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    isPending
}) => {
    if (!isOpen) return null;

    return (
        <ModalCustom onClose={onClose} className="w-[450px] !bg-white !text-slate-900 border-none rounded-[2.5rem] shadow-2xl">
            <div className="p-10 text-center">
                <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-rose-100/50">
                    <Trash2 size={36} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black mb-3 tracking-tight">Xóa bản ghi?</h3>
                <p className="text-slate-400 font-medium text-sm mb-10 leading-relaxed px-4">
                    Hành động này sẽ xóa vĩnh viễn bộ phim khỏi hệ thống. Thao tác này không thể hoàn tác.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-3.5 rounded-2xl bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all font-black flex-1 text-sm uppercase tracking-wider"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white transition-all font-black flex-1 shadow-lg shadow-rose-600/20 text-sm uppercase tracking-wider"
                    >
                        {isPending ? 'Đang xóa...' : 'Xác nhận xóa'}
                    </button>
                </div>
            </div>
        </ModalCustom>
    );
};

export default DeleteMovieModal;
