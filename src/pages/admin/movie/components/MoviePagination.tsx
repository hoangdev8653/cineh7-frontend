import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MoviePaginationProps {
    totalMovies: number;
}

const MoviePagination: React.FC<MoviePaginationProps> = ({ totalMovies }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hiển thị {totalMovies} phim mỗi trang</p>
            <div className="flex items-center gap-3">
                <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all disabled:opacity-30 shadow-sm">
                    <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                    <button className="w-12 h-12 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-600/20">1</button>
                </div>
                <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all disabled:opacity-30 shadow-sm">
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default MoviePagination;
