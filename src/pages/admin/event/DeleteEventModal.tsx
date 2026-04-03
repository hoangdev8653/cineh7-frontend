import { Trash2 } from 'lucide-react';
import ModalCustom from '../../../components/common/Modal';
import type { DeleteNewsEventModalProps } from '../../../types/event.types';


const DeleteNewsEventModal: React.FC<DeleteNewsEventModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    isPending
}) => {
    if (!isOpen) return null;

    return (
        <ModalCustom onClose={onClose} className="w-full max-w-[450px] !bg-white !text-slate-900 border-none rounded-[3rem] p-10 shadow-2xl text-center">
            <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-rose-100/50">
                <Trash2 size={40} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-black mb-3 tracking-tight">Xóa bài viết?</h3>
            <p className="text-slate-400 font-medium text-sm mb-10 leading-relaxed px-4">
                Việc xóa <span className="text-rose-600">bài viết này</span> sẽ gỡ bỏ nó khỏi tất cả giao diện người dùng ngay lập tức. Bạn có chắc chắn không?
            </p>
            <div className="flex flex-col gap-3">
                <button
                    onClick={onConfirm}
                    disabled={isPending}
                    className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-600/20 text-sm active:scale-[0.98] disabled:opacity-50"
                >
                    {isPending ? 'Đang xóa...' : 'Xác Nhận Xóa'}
                </button>
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

export default DeleteNewsEventModal;
