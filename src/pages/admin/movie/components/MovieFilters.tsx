import React from 'react';
import { Search, Filter } from 'lucide-react';

interface MovieFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    filterStatus: 'ALL' | 'NOW_SHOWING' | 'COMING_SOON' | 'END_SHOWING';
    onFilterStatusChange: (value: 'ALL' | 'NOW_SHOWING' | 'COMING_SOON' | 'END_SHOWING') => void;
}

const MovieFilters: React.FC<MovieFiltersProps> = ({
    searchQuery,
    onSearchChange,
    filterStatus,
    onFilterStatusChange
}) => {
    return (
        <div className="bg-white border border-slate-100 p-6 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Tìm kiếm phim theo tên, đạo diễn hoặc diễn viên..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-slate-50 border-none text-slate-900 pl-12 pr-4 py-3 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all placeholder:text-slate-400 text-sm font-medium"
                />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400">
                    <Filter size={18} />
                </div>
                <select
                    value={filterStatus}
                    onChange={(e) => onFilterStatusChange(e.target.value as any)}
                    className="bg-slate-50 border-none text-slate-900 px-5 py-3 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 focus:bg-white outline-none transition-all cursor-pointer w-full md:w-56 appearance-none font-bold text-sm"
                >
                    <option value="ALL">Tất cả trạng thái</option>
                    <option value="NOW_SHOWING">Đang chiếu</option>
                    <option value="COMING_SOON">Sắp chiếu</option>
                    <option value="END_SHOWING">Đã ngưng chiếu</option>
                </select>
            </div>
        </div>
    );
};

export default MovieFilters;
