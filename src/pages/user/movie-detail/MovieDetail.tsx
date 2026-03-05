import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Play, Calendar, Clock, Star, Heart, Share2, Ticket, ChevronRight } from 'lucide-react';
import { useMovieDetail } from '../../../hooks/useMovie';
import type { IMovie } from '../../../types/movie.types';
import VideoModal from '../../../components/features/videoModal/VideoModal';
import { useShowTimeGrouped } from '../../../hooks/useShowTime';

function MovieDetail() {
    const { id } = useParams();
    const { data, isLoading } = useMovieDetail(id || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: showtimeGrouped } = useShowTimeGrouped(id || '');
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    useEffect(() => {
        if (showtimeGrouped && Object.keys(showtimeGrouped).length > 0 && !selectedDate) {
            setSelectedDate(Object.keys(showtimeGrouped)[0]);
        }
    }, [showtimeGrouped, selectedDate]);

    const movie = data ? {
        ...data,
        metadata: typeof data.metadata === 'string' ? JSON.parse(data.metadata) : data.metadata
    } as IMovie : null;

    const groupedByTheater = selectedDate && showtimeGrouped?.[selectedDate]
        ? showtimeGrouped[selectedDate].reduce((acc: any, showtime: any) => {
            const theater = showtime.room?.theater;
            const theaterId = theater?.id;
            if (!theaterId) return acc;
            if (!acc[theaterId]) {
                acc[theaterId] = {
                    info: theater,
                    showtimes: []
                };
            }
            acc[theaterId].showtimes.push(showtime);
            return acc;
        }, {})
        : {};

    console.log(showtimeGrouped);


    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!movie) return <div className="min-h-screen flex items-center justify-center">Movie not found</div>;

    return (
        <div className="bg-white min-h-screen pb-20 font-sans text-slate-800">
            <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
                <img
                    src={movie?.image_url}
                    alt={movie.title}
                    className="w-full h-full object-cover scale-110 blur-[2px] opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />

                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4 md:px-32 flex flex-col md:flex-row gap-12">
                        <div className="w-64 aspect-[2/3] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-400 shrink-0 border-4 border-white hidden md:block group relative">
                            <img src={movie?.image_url} alt={movie.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform"
                                >
                                    <Play fill="currentColor" size={24} className="ml-1" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-grow pt-8 md:pt-20">
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="px-4 py-1.5 bg-slate-900/5 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest uppercase text-slate-900 border border-slate-900/10">
                                    {movie.metadata?.genre || 'N/A'}
                                </span>
                                <span className="px-4 py-1.5 bg-red-600 rounded-full text-[10px] font-black tracking-widest uppercase text-white shadow-lg shadow-red-600/20">
                                    HOT RELEASING
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-slate-900 mb-6 uppercase leading-tight">
                                {movie.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-8 mb-10">
                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/20">
                                        <Star fill="currentColor" className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Classification</p>
                                        <p className="text-xl font-black text-slate-900">{movie.metadata?.rating || 'N/A'}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20 text-white">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Duration</p>
                                        <p className="text-xl font-black text-slate-900">{movie.duration} Mins</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-900/20 text-white">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Released Year</p>
                                        <p className="text-xl font-black text-slate-900">{new Date(movie.release_date).getFullYear()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button className="px-10 py-5 bg-red-600 text-white rounded-2xl font-black italic tracking-widest uppercase hover:bg-red-700 transition-all shadow-2xl shadow-red-600/40 active:scale-95 flex items-center gap-3">
                                    <Ticket size={24} /> Get Tickets Now
                                </button>
                                <button className="w-16 h-16 border-2 border-slate-200 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-colors">
                                    <Heart size={24} />
                                </button>
                                <button className="w-16 h-16 border-2 border-slate-200 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-colors">
                                    <Share2 size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-32 -mt-12 md:mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-16">
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-8 bg-red-600 rounded-full" />
                                <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900">Synopsis</h2>
                            </div>
                            <p className="text-xl text-slate-600 leading-relaxed font-medium">
                                {movie.description}
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-8 bg-red-600 rounded-full" />
                                <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900">Showtimes</h2>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-10">
                                {showtimeGrouped && Object.keys(showtimeGrouped).map((date) => (
                                    <button
                                        key={date}
                                        onClick={() => setSelectedDate(date)}
                                        className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${selectedDate === date
                                            ? 'bg-red-600 text-white shadow-2xl shadow-red-600/40 scale-105'
                                            : 'bg-slate-50 border-2 border-slate-100 text-slate-400 hover:border-red-600 hover:text-red-600 hover:bg-white'
                                            }`}
                                    >
                                        <div className="flex flex-col items-center leading-none gap-1">
                                            <span className="text-[10px] opacity-60">
                                                {new Date(date).toLocaleDateString('vi-VN', { weekday: 'short' })}
                                            </span>
                                            <span className="text-lg">
                                                {new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-6">
                                {Object.values(groupedByTheater).map((group: any) => (
                                    <div key={group.info.id} className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 group">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-900 group-hover:text-red-600 transition-colors uppercase italic tracking-tighter">
                                                    {group.info.name}
                                                </h3>
                                                <p className="text-slate-400 font-bold text-sm mt-1">{group.info.address}</p>
                                            </div>
                                            <button className="text-red-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                                                View Map <ChevronRight size={16} />
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap gap-4">
                                            {group.showtimes.map((item: any, idx: number) => {
                                                const time = new Date(item.start_time);
                                                const hours = time.getUTCHours();
                                                const minutes = time.getUTCMinutes().toString().padStart(2, '0');

                                                let suffix = 'sáng';
                                                if (hours >= 18) suffix = 'tối';
                                                else if (hours >= 12 || (hours >= 1 && hours <= 6)) suffix = 'chiều';

                                                const timeDisplay = `${hours}h${minutes} ${suffix}`;
                                                return (
                                                    <button key={idx} className="group/time relative px-8 py-4 cursor-pointer bg-white border-2 border-slate-100 rounded-3xl font-black text-slate-900 hover:bg-red-600 hover:border-red-600 hover:text-white hover:shadow-xl hover:shadow-red-600/20 transition-all duration-300 flex flex-col items-center">
                                                        <a href={`/room/${item.room.id}`}>
                                                            <span className="text-xl tracking-tighter ">{timeDisplay}</span>
                                                        </a>
                                                        <span className="text-[10px] uppercase opacity-40 group-hover/time:opacity-100 mt-1">
                                                            {item.room?.name || 'Standard'}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                                {Object.keys(groupedByTheater).length === 0 && !isLoading && (
                                    <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No showtimes available for this date</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-4 space-y-12">
                        <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-900/40 sticky top-24">
                            <h3 className="text-2xl font-black italic mb-8 border-b border-white/10 pb-4">Details</h3>
                            <div className="space-y-8">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Director</p>
                                    <p className="text-lg font-bold">{movie.metadata?.director || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Starring</p>
                                    <p className="text-lg font-bold leading-relaxed">{movie.metadata?.actors?.join(', ') || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Release Date</p>
                                    <p className="text-lg font-bold">{new Date(movie.release_date).toLocaleDateString('vi-VN')}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Language</p>
                                    <p className="text-lg font-bold">{movie.metadata?.language || 'N/A'}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full mt-12 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                            >
                                Official Trailer
                            </button>

                            <VideoModal
                                isOpen={isModalOpen}
                                close={() => setIsModalOpen(false)}
                                videoUrl={movie?.video_url || ''}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
