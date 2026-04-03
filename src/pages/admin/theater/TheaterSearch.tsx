import React from 'react';
import { Search, Theater as TheaterIcon } from 'lucide-react';
import type { TheaterSearchProps } from '../../../types/theater.types';

const TheaterSearch: React.FC<TheaterSearchProps> = ({ value, onChange }) => {
    return (
        <div className="bg-white border border-slate-100 p-2 rounded-[2rem] shadow-sm flex items-center pr-4">
            <div className="relative flex-1">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Tìm kiếm rạp theo tên hoặc địa chỉ..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-transparent text-slate-900 pl-16 pr-6 py-4 rounded-xl outline-none transition-all placeholder:text-slate-400 font-medium"
                />
            </div>
            <div className="h-10 w-[1px] bg-slate-100 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-3 px-4">
                <TheaterIcon size={18} className="text-indigo-600" />
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Hệ Thống Rạp</span>
            </div>
        </div>
    );
};

export default TheaterSearch;
