import React from 'react';
import { Plus } from 'lucide-react';

interface NewsEventHeaderProps {
    totalItems: number;
    onAdd: () => void;
}

const NewsEventHeader: React.FC<NewsEventHeaderProps> = ({ totalItems, onAdd }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
                <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Tin Tức & Sự Kiện</h1>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black ring-1 ring-indigo-500/10">
                        {totalItems} Mục
                    </span>
                </div>
                <p className="text-slate-500 font-medium">Quản lý các bài viết tin tức và chương trình khuyến mãi.</p>
            </div>

            <button
                onClick={onAdd}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-lg shadow-indigo-600/20 active:scale-95 text-sm uppercase tracking-wider"
            >
                <Plus size={20} />
                Thêm Mới
            </button>
        </div>
    );
};

export default NewsEventHeader;
