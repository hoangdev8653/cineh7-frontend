import { useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { THEATER_SYSTEMS, THEATERS } from '../../../data/theaters';
import { PATH } from '../../../utils/path';

function Theater() {
    const [selectedSystem, setSelectedSystem] = useState(THEATER_SYSTEMS[0].id);

    const filteredTheaters = THEATERS.filter(theater => theater.systemId === selectedSystem);

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Banner Section */}
            <div className="relative h-60 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                    className="w-full h-full object-cover"
                    alt="Cinema Banner"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4">
                    <h1 className="text-4xl font-black italic tracking-tighter mb-2">HỆ THỐNG RẠP</h1>
                    <p className="text-lg text-slate-200">Tìm kiếm rạp phim gần bạn nhất</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-12 relative z-10">
                {/* System Selector */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-12 border border-slate-100">
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                        {THEATER_SYSTEMS.map((system) => (
                            <button
                                key={system.id}
                                onClick={() => setSelectedSystem(system.id)}
                                className={`flex flex-col items-center gap-3 group transition-all duration-300 ${selectedSystem === system.id ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-100'
                                    }`}
                            >
                                <div className={`w-16 h-16 rounded-2xl p-2 bg-white shadow-sm border-2 transition-all ${selectedSystem === system.id ? 'border-red-600 shadow-red-100' : 'border-slate-100'
                                    }`}>
                                    <img
                                        src={system.logo}
                                        alt={system.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <span className={`text-xs font-bold uppercase tracking-wider ${selectedSystem === system.id ? 'text-red-600' : 'text-slate-500'
                                    }`}>
                                    {system.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Theater Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-slate-800">
                    {filteredTheaters.length > 0 ? (
                        filteredTheaters.map((theater) => (
                            <div key={theater.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 group">
                                <div className="h-56 overflow-hidden relative">
                                    <img
                                        src={theater.image}
                                        alt={theater.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 shadow-sm flex items-center gap-2">
                                        <MapPin size={14} className="text-red-600" />
                                        <span className="text-xs font-bold text-slate-900">TP. Hồ Chí Minh</span>
                                    </div>
                                </div>
                                <div className="p-6 text-slate-800">
                                    <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-red-600 transition-colors">
                                        {theater.name}
                                    </h3>
                                    <p className="text-slate-500 text-sm mb-6 leading-relaxed flex gap-2">
                                        <MapPin size={18} className="text-slate-400 shrink-0" />
                                        {theater.address}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                                <Phone size={14} />
                                                <span className="text-[10px] uppercase font-bold tracking-widest">Hotline</span>
                                            </div>
                                            <p className="text-xs font-bold text-slate-700">1900 6017</p>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                                <Clock size={14} />
                                                <span className="text-[10px] uppercase font-bold tracking-widest">Giờ mở cửa</span>
                                            </div>
                                            <p className="text-xs font-bold text-slate-700">8:00 - 23:30</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <a
                                            href={theater.mapUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="grow flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold rounded-2xl transition-all"
                                        >
                                            <ExternalLink size={16} />
                                            Xem bản đồ
                                        </a>
                                        <button className="grow flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-2xl transition-all shadow-lg shadow-red-600/20">
                                            Đặt vé ngay
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-slate-400 italic">Hiện tại chưa có thông tin rạp cho hệ thống này.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Theater;