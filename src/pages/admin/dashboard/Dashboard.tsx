import React from 'react';
import { motion } from 'framer-motion';
import {
    Film,
    Theater,
    Users,
    Calendar,
    TrendingUp,
    Clock,
    Plus,
    Newspaper,
    Home
} from 'lucide-react';
import { useMovies } from '../../../hooks/useMovie';
import { useTheaters } from '../../../hooks/useTheater';
import { useNewsEvents } from '../../../hooks/useNewsEvent';
import { useRooms } from '../../../hooks/useRoom';

const Dashboard: React.FC = () => {
    const { data: movies, isLoading: moviesLoading } = useMovies();
    const { data: theaters, isLoading: theatersLoading } = useTheaters();
    const { data: newsEvents, isLoading: newsLoading } = useNewsEvents();
    const { data: rooms, isLoading: roomsLoading } = useRooms();

    const stats = [
        {
            label: 'Total Movies',
            value: movies?.length || 0,
            icon: Film,
            color: 'bg-blue-500',
            trend: '+12%',
            loading: moviesLoading
        },
        {
            label: 'Theaters',
            value: theaters?.length || 0,
            icon: Theater,
            color: 'bg-purple-500',
            trend: '+2',
            loading: theatersLoading
        },
        {
            label: 'Rooms',
            value: rooms?.length || 0,
            icon: Home,
            color: 'bg-emerald-500',
            trend: '+5%',
            loading: roomsLoading
        },
        {
            label: 'News & Events',
            value: newsEvents?.length || 0,
            icon: Newspaper,
            color: 'bg-orange-500',
            trend: 'Stable',
            loading: newsLoading
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                    <p className="text-gray-400">Welcome back, here's what's happening today.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/20">
                    <Plus size={20} />
                    Create New Movie
                </button>
            </div>

            {/* Stats Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        variants={item}
                        className="bg-gray-800 border border-gray-700 p-6 rounded-2xl hover:border-gray-600 transition-all group relative overflow-hidden"
                    >
                        <div className="flex items-center justify-between relative z-10">
                            <div>
                                <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">
                                    {stat.label}
                                </p>
                                <h3 className="text-3xl font-bold mt-1 text-white">
                                    {stat.loading ? '...' : stat.value}
                                </h3>
                            </div>
                            <div className={`${stat.color} p-3 rounded-xl shadow-inner group-hover:scale-110 transition-transform`}>
                                <stat.icon size={24} className="text-white" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-center text-sm relative z-10">
                            <span className={`flex items-center ${stat.trend.startsWith('+') ? 'text-emerald-400' : 'text-blue-400'} font-medium`}>
                                {stat.trend.startsWith('+') && <TrendingUp size={14} className="mr-1" />}
                                {stat.trend}
                            </span>
                            <span className="text-gray-500 ml-2">since last month</span>
                        </div>

                        {/* Aesthetic element */}
                        <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${stat.color} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity`}></div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Movies List */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden"
                >
                    <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <Clock size={20} className="text-blue-400" />
                            Recently Added Movies
                        </h3>
                        <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Movie</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {movies?.slice(0, 5).map((movie: any) => (
                                    <tr key={movie.id} className="hover:bg-gray-700/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded bg-gray-700 flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `url(${movie.posterUrl})` }}></div>
                                                <span className="font-medium text-gray-200">{movie.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase tracking-tighter ${movie.status === 'NOW_SHOWING' ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-800' :
                                                    movie.status === 'COMING_SOON' ? 'bg-orange-900/40 text-orange-400 border border-orange-800' :
                                                        'bg-red-900/40 text-red-400 border border-red-800'
                                                }`}>
                                                {movie.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-400 hover:text-white transition-colors">Edit</button>
                                        </td>
                                    </tr>
                                ))}
                                {(!movies || movies.length === 0) && !moviesLoading && (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                            No recent movies found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Quick Shortcuts / Activity */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gray-800 border border-gray-700 rounded-2xl p-6 h-fit"
                >
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                        <TrendingUp size={20} className="text-purple-400" />
                        System Status
                    </h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-900/30 rounded-lg">
                                    <Calendar size={18} className="text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Coming Soon</p>
                                    <p className="text-xs text-gray-500">Upcoming releases</p>
                                </div>
                            </div>
                            <span className="font-bold text-blue-400">
                                {movies?.filter((m: any) => m.status === 'COMING_SOON').length || 0}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-900/30 rounded-lg">
                                    <Film size={18} className="text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Now Showing</p>
                                    <p className="text-xs text-gray-500">Currently in theaters</p>
                                </div>
                            </div>
                            <span className="font-bold text-emerald-400">
                                {movies?.filter((m: any) => m.status === 'NOW_SHOWING').length || 0}
                            </span>
                        </div>
                        <div className="pt-6 border-t border-gray-700">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Quick Actions</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="p-3 bg-gray-900 rounded-xl hover:bg-gray-700 transition-colors text-xs font-medium flex flex-col items-center gap-2 border border-gray-700">
                                    <Users size={16} className="text-blue-400" />
                                    Users
                                </button>
                                <button className="p-3 bg-gray-900 rounded-xl hover:bg-gray-700 transition-colors text-xs font-medium flex flex-col items-center gap-2 border border-gray-700">
                                    <Calendar size={16} className="text-purple-400" />
                                    Schedules
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;