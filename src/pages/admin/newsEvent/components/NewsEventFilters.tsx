import React from 'react';
import { Search, Tag } from 'lucide-react';

interface NewsEventFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    typeFilter: 'ALL' | 'NEWS' | 'EVENT';
    onTypeFilterChange: (value: 'ALL' | 'NEWS' | 'EVENT') => void;
}

const NewsEventFilters: React.FC<NewsEventFiltersProps> = ({
    searchQuery,
    onSearchChange,
    typeFilter,
    onTypeFilterChange
}) => {
    return (
        <div className="bg-white border border-slate-100 p-2 rounded-[2rem] shadow-sm flex flex-col md:flex-row items-center gap-2 pr-4">
            <div className="relative flex-1 w-full">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tiêu đề..."
                    className="w-full bg-white border-none rounded-2xl pl-12 pr-6 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-600/10 outline-none transition-all font-bold text-sm shadow-sm"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <div className="h-10 w-[1px] bg-slate-100 mx-2 hidden md:block"></div>
            <div className="flex items-center gap-4 px-4 w-full md:w-auto">
                <Tag className="text-indigo-600 hidden md:block" size={18} />
                <select
                    className="bg-white border-none rounded-2xl px-8 py-4 text-slate-900 font-black text-sm focus:ring-2 focus:ring-indigo-600/10 outline-none transition-all shadow-sm cursor-pointer appearance-none min-w-[180px]"
                    value={typeFilter}
                    onChange={(e) => onTypeFilterChange(e.target.value as any)}
                >
                    <option value="ALL">Tất Cả</option>
                    <option value="NEWS">Tin Tức</option>
                    <option value="EVENT">Sự Kiện</option>
                </select>
            </div>
        </div>
    );
};

export default NewsEventFilters;
