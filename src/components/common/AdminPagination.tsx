import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AdminPaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const AdminPagination: React.FC<AdminPaginationProps> = ({ page, totalPages, onPageChange }) => {
    // Đảm bảo totalPages luôn ít nhất là 1
    const safeTotalPages = Math.max(1, totalPages);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-6 pt-4 pb-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Đang ở trang <span className="text-indigo-600">{page}</span> / {safeTotalPages}
            </p>
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1}
                    className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all disabled:opacity-30 shadow-sm disabled:cursor-not-allowed">
                    <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                    <button className="w-12 h-12 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-600/20">
                        {page}
                    </button>
                </div>
                <button 
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= safeTotalPages}
                    className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all disabled:opacity-30 shadow-sm disabled:cursor-not-allowed">
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default AdminPagination;
