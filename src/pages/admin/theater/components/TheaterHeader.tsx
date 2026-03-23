import React from 'react';
import { Plus } from 'lucide-react';

interface TheaterHeaderProps {
    onAdd: () => void;
}

const TheaterHeader: React.FC<TheaterHeaderProps> = ({ onAdd }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Quản Lý Rạp Chiếu</h1>
                <p className="text-slate-400 font-medium mt-1">Quản lý tất cả các địa điểm rạp và thông tin liên hệ một cách dễ dàng</p>
            </div>
            <button
                onClick={onAdd}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3.5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20 active:scale-95 text-xs"
            >
                <Plus size={18} strokeWidth={3} />
                Thêm Rạp Mới
            </button>
        </div>
    );
};

export default TheaterHeader;
