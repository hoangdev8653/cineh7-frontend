import React from 'react';
import { motion } from 'framer-motion';
import {
    Film,
    Theater,
    Users,
    TrendingUp,
    TrendingDown,
    DollarSign,
    MoreVertical,
    ArrowUpRight,
} from 'lucide-react';
import { useMovies } from '../../../hooks/useMovie';
import { useTheaters } from '../../../hooks/useTheater';
import { useUsers } from "../../../hooks/useUser"

const Dashboard: React.FC = () => {
    const { data: movies } = useMovies();
    const { data: theaters } = useTheaters();
    const { data: users } = useUsers();

    console.log(movies);


    const stats = [
        {
            label: 'Total Revenue',
            value: '$45,231.89',
            icon: DollarSign,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            trend: '20.1%',
            isUp: true
        },
        {
            label: 'Active Users',
            value: users?.length || 0,
            icon: Users,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            trend: '15.3%',
            isUp: true
        },
        {
            label: 'Total Theaters',
            value: theaters?.length || 0,
            icon: Theater,
            color: 'text-rose-600',
            bg: 'bg-rose-50',
            trend: '4.2%',
            isUp: false
        },
        {
            label: 'Total Movies',
            value: movies?.length || 0,
            icon: Film,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            trend: '8.7%',
            isUp: true
        }
    ];

    return (
        <div className="space-y-10 pb-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
                <p className="text-slate-400 font-medium mt-1">Welcome back! Here's what's happening with your business today.</p>
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
                                <span className="text-[10px] font-bold text-slate-400 ml-2 uppercase tracking-wider">vs last month</span>
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
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Revenue Overview</h3>
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
                            {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map(m => (
                                <span key={m} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Profit vs Expenses - Simulated Bar Chart */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Profit vs Expenses</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 bg-slate-200 rounded-full"></div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expenses</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Profit</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-64 flex items-end justify-between px-2 gap-2">
                        {[40, 70, 45, 90, 65, 80, 95, 75, 85, 60, 55, 70].map((val, i) => (
                            <div key={i} className="flex-1 flex flex-col gap-1 items-center">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${val}%` }}
                                    transition={{ duration: 1, delay: i * 0.05 }}
                                    className="w-full bg-indigo-600 rounded-t-lg relative group/bar"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20">
                                        ${val},000
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${val * 0.4}%` }}
                                    transition={{ duration: 1, delay: 0.2 + i * 0.05 }}
                                    className="w-full bg-slate-100 rounded-sm"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 px-1">
                        {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m, i) => (
                            <span key={i} className="text-[10px] font-bold text-slate-300 w-full text-center">{m}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Recent Orders</h3>
                        <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">View All</button>
                    </div>
                    <div className="p-4">
                        <div className="space-y-1">
                            {[
                                { name: 'John Doe', item: 'Wireless Headphones', price: '$129.99', status: 'Completed', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                                { name: 'Jane Smith', item: 'Smart Watch', price: '$299.99', status: 'Pending', color: 'text-amber-600', bg: 'bg-amber-50' },
                                { name: 'Bob Johnson', item: 'Laptop Stand', price: '$49.99', status: 'Completed', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                                { name: 'Alice Williams', item: 'USB-C Cable', price: '$19.99', status: 'Processing', color: 'text-blue-600', bg: 'bg-blue-50' },
                            ].map((order, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-3xl hover:bg-slate-50 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-slate-400 group-hover:bg-white group-hover:shadow-sm transition-all italic">
                                            {order.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 leading-none mb-1">{order.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.item}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-slate-900 mb-1">{order.price}</p>
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${order.bg} ${order.color}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-8">Top Products</h3>
                    <div className="space-y-8">
                        {[
                            { name: 'Wireless Headphones', sales: '1,234 sales', revenue: '$160,410.00', growth: '12.5%' },
                            { name: 'Smart Watch', sales: '987 sales', revenue: '$296,003.00', growth: '8.3%' },
                            { name: 'Laptop Stand', sales: '856 sales', revenue: '$42,784.00', growth: '3.2%' },
                            { name: 'USB-C Hub', sales: '743 sales', revenue: '$51,901.00', growth: '15.7%' },
                        ].map((prod, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <p className="text-sm font-black text-slate-900 leading-none mb-1 group-hover:text-indigo-600 transition-colors">{prod.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{prod.sales}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-slate-900">{prod.revenue}</p>
                                        <p className="text-[10px] font-black text-emerald-600 flex items-center justify-end gap-0.5">
                                            <ArrowUpRight size={10} />
                                            {prod.growth}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${100 - i * 15}%` }}
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
