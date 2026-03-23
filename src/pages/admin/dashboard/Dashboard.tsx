import React from 'react';
import { motion } from 'framer-motion';
import {
    Ticket,
    Film,
    Users,
    TrendingUp,
    TrendingDown,
    DollarSign,
    MoreVertical,
    ArrowUpRight,
} from 'lucide-react';
import { useGetAllOverview, useGetOrders, useGetRevenue, useGetTopMovie } from "../../../hooks/useStatistics"

const Dashboard: React.FC = () => {

    const { data: overview } = useGetAllOverview();
    const { data: revenue } = useGetRevenue('day');
    const { data: topMovie } = useGetTopMovie();
    const { data: orders } = useGetOrders('day');

    // console.log(revenue);
    console.log(orders);


    const stats = [
        {
            label: 'Tổng Doanh Thu',
            value: overview?.revenue || 0,
            icon: DollarSign,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            trend: '20.1%',
            isUp: true
        },
        {
            label: 'Người Dùng Hoạt Động',
            value: overview?.users || 0,
            icon: Users,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            trend: '15.3%',
            isUp: true
        },
        {
            label: 'Tổng Số Vé',
            value: overview?.tickets || 0,
            icon: Ticket,
            color: 'text-rose-600',
            bg: 'bg-rose-50',
            trend: '4.2%',
            isUp: false
        },
        {
            label: 'Tổng Đơn Hàng',
            value: overview?.orders || 0,
            icon: Film,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            isUp: true
        }
    ];

    return (
        <div className="space-y-10 pb-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Tổng Quan Hệ Thống</h1>
                <p className="text-slate-400 font-medium mt-1">Chào mừng trở lại! Đây là tình hình kinh doanh của bạn hôm nay.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
                            <div className={`${stat.bg} ${stat.color} p-2.5 rounded-2xl group-hover:scale-110 transition-transform`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 leading-tight tracking-tight">{stat.value}</h3>
                            <div className="flex items-center mt-2">
                                <span className={`flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-full ${stat.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                    {stat.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                    {stat.trend}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 ml-2 uppercase tracking-wider">so với tháng trước</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Overview - Simulated Wave Chart */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Biểu Đồ Doanh Thu</h3>
                        <button className="text-slate-300 hover:text-slate-900 transition-colors"><MoreVertical size={20} /></button>
                    </div>

                    <div className="h-64 w-full relative z-10">
                        {/* Simple SVG Wave Animation */}
                        <svg viewBox="0 0 400 150" className="w-full h-full">
                            <defs>
                                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                d="M0,80 C50,110 80,40 130,70 C180,100 230,20 280,60 C330,100 370,50 400,80 L400,150 L0,150 Z"
                                fill="url(#gradient)"
                            />
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                d="M0,80 C50,110 80,40 130,70 C180,100 230,20 280,60 C330,100 370,50 400,80"
                                fill="none"
                                stroke="#4f46e5"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            {/* Dots */}
                            {[80, 130, 280, 400].map((cx, i) => (
                                <motion.circle
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1.5 + i * 0.2 }}
                                    cx={cx}
                                    cy={cx === 80 ? 80 : cx === 130 ? 70 : cx === 280 ? 60 : 80}
                                    r="4"
                                    fill="white"
                                    stroke="#4f46e5"
                                    strokeWidth="2"
                                />
                            ))}
                        </svg>

                        {/* X-Axis labels */}
                        <div className="flex justify-between mt-4 px-2">
                            {['Tháng 1', 'Tháng 3', 'Tháng 5', 'Tháng 7', 'Tháng 9', 'Tháng 11'].map(m => (
                                <span key={m} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Revenue Statistics - Bar Chart */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Thống Kê Doanh Thu</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Doanh thu</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 bg-slate-100 rounded-full"></div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Đơn hàng</span>
                            </div>
                        </div>
                    </div>
                    {revenue && revenue.length > 0 ? (
                        <div className="h-64 flex items-end justify-between px-2 gap-2">
                            {revenue.map((item: any, i: number) => {
                                const maxRevenue = Math.max(...revenue.map((r: any) => r.revenue), 1);
                                const height = (item.revenue / maxRevenue) * 100;
                                return (
                                    <div key={i} className="flex-1 flex flex-col gap-1 items-center h-full justify-end">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${height}%` }}
                                            transition={{ duration: 1, delay: i * 0.05 }}
                                            className="w-full bg-indigo-600 rounded-t-lg relative group/bar"
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20">
                                                {item.revenue.toLocaleString()}đ
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(item.totalOrders / (Math.max(...revenue.map((r: any) => r.totalOrders), 1) || 1)) * 20}%` }}
                                            transition={{ duration: 1, delay: 0.2 + i * 0.05 }}
                                            className="w-full bg-slate-100 rounded-t-sm"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="h-64 flex items-center justify-center opacity-20">
                            <DollarSign size={40} />
                            <p className="text-sm font-black uppercase tracking-widest ml-2">Không có dữ liệu doanh thu</p>
                        </div>
                    )}
                    <div className="flex justify-between mt-4 px-1 gap-1">

                        {revenue?.map((item: any, i: number) => (
                            <span key={i} className="text-[9px] font-black text-slate-300 w-full text-center truncate uppercase tracking-tighter" title={item.label}>
                                {item.label.split('-').pop() || item.label}
                            </span>
                        ))}
                    </div>
                </div>

            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Order Status Overview */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Trạng Thái Đơn Hàng</h3>
                        <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">Xem tất cả</button>
                    </div>
                    <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {orders && orders.length > 0 ? (
                                orders.map((order: any, i: number) => (
                                    <div key={i} className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col gap-4 group hover:bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Giai đoạn</span>
                                                <h4 className="text-sm font-black text-slate-900 uppercase">{order.label}</h4>
                                            </div>
                                            <div className="bg-white p-3 rounded-2xl shadow-sm text-indigo-600 flex flex-col items-center min-w-[60px] group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                                                <span className="text-xs font-bold opacity-60 leading-none mb-1">Tổng</span>
                                                <span className="text-xl font-black leading-none">{order.total}</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 mt-2">
                                            <div className="bg-white p-3 rounded-2xl border border-slate-100 flex flex-col items-center">
                                                <span className="text-[9px] font-black text-emerald-600 uppercase mb-1">Đã trả</span>
                                                <span className="text-sm font-black text-slate-900">{order.paid}</span>
                                            </div>
                                            <div className="bg-white p-3 rounded-2xl border border-slate-100 flex flex-col items-center">
                                                <span className="text-[9px] font-black text-rose-600 uppercase mb-1">Đã hủy</span>
                                                <span className="text-sm font-black text-slate-900">{order.cancelled}</span>
                                            </div>
                                            <div className="bg-white p-3 rounded-2xl border border-slate-100 flex flex-col items-center">
                                                <span className="text-[9px] font-black text-amber-600 uppercase mb-1">Hết hạn</span>
                                                <span className="text-sm font-black text-slate-900">{order.expired}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-1.5 px-0.5">
                                                <span className="text-[9px] font-black text-slate-400 uppercase">Tỉ lệ thành công</span>
                                                <span className="text-[9px] font-black text-emerald-600">{Math.round((order.paid / (order.total || 1)) * 100)}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-white rounded-full overflow-hidden p-0.5 border border-slate-100">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(order.paid / (order.total || 1)) * 100}%` }}
                                                    transition={{ duration: 1.5, delay: 0.2 }}
                                                    className="h-full bg-emerald-500 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-20 flex flex-col items-center justify-center opacity-30">
                                    <Ticket size={48} className="text-slate-400 mb-2" />
                                    <p className="text-xs font-black uppercase tracking-widest">Không tìm thấy thống kê đơn hàng</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>


                {/* Top Movies */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-8">Phim Bán Chạy Nhất</h3>
                    <div className="space-y-8">
                        {topMovie?.map((movie: any, i: number) => (
                            <div key={movie.movieId} className="group cursor-pointer">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-12 h-16 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden shadow-sm border border-slate-50 group-hover:scale-105 transition-transform duration-500">
                                            <img
                                                src={movie.poster}
                                                alt={movie.title}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-sm font-black text-slate-900 leading-tight mb-1 group-hover:text-indigo-600 transition-colors truncate pr-2">
                                                {movie.title}
                                            </p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                                {movie.ticketsSold.toLocaleString()} vé đã bán
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-sm font-black text-slate-900">
                                            {movie.revenue.toLocaleString()}đ
                                        </p>
                                        <p className="text-[10px] font-black text-emerald-600 flex items-center justify-end gap-0.5">
                                            <ArrowUpRight size={10} />
                                            Đang bán
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(movie.ticketsSold / Math.max(...topMovie.map((m: any) => m.ticketsSold), 1)) * 100}%` }}
                                        transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                                        className="h-full bg-indigo-600 rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
