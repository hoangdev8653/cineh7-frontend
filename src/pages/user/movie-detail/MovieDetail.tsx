import { useParams, Link } from 'react-router-dom';
import { Play, Calendar, Clock, Star, Info, Ticket, ChevronRight, Share2, Heart } from 'lucide-react';
import { SAMPLE_MOVIES } from '../../../data/movies';
import { THEATERS } from '../../../data/theaters';

function MovieDetail() {
    const { id } = useParams();
    const movie = SAMPLE_MOVIES.find(m => m.id === Number(id)) || SAMPLE_MOVIES[0];

    const showtimes = ['10:30', '13:15', '16:00', '19:45', '22:30'];
    const selectedTheaters = THEATERS.slice(0, 3);

    return (
        <div className="bg-white min-h-screen pb-20 font-sans text-slate-800">
            <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
                <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover scale-110 blur-[2px] opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />

                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4 md:px-32 flex flex-col md:flex-row gap-12">
                        <div className="w-64 aspect-[2/3] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-400 shrink-0 border-4 border-white hidden md:block group relative">
                            <img src={movie.image} alt={movie.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
                                    <Play fill="currentColor" size={24} className="ml-1" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-grow pt-8 md:pt-20">
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                {movie.tags.map((tag, idx) => (
                                    <span key={idx} className="px-4 py-1.5 bg-slate-900/5 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest uppercase text-slate-900 border border-slate-900/10">
                                        {tag}
                                    </span>
                                ))}
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
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rating</p>
                                        <p className="text-xl font-black text-slate-900">{movie.rating}/10</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20 text-white">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Duration</p>
                                        <p className="text-xl font-black text-slate-900">128 Mins</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-900/20 text-white">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Released</p>
                                        <p className="text-xl font-black text-slate-900">2026</p>
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

            {/* Main Details Area */}
            <div className="container mx-auto px-4 md:px-32 -mt-12 md:mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left: Synopsis & Info */}
                    <div className="lg:col-span-8 space-y-16">
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-8 bg-red-600 rounded-full" />
                                <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900">Synopsis</h2>
                            </div>
                            <p className="text-xl text-slate-600 leading-relaxed font-medium">
                                Step into the thrilling world of <span className="text-slate-900 font-bold">{movie.title}</span>.
                                This epic journey combines high-stakes action with deep emotional storytelling.
                                As the boundaries between reality and fantasy blur, our heroes must confront their inner demons
                                to save everything they hold dear. Experience cinema like never before in this highly anticipated masterpiece.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-8 bg-red-600 rounded-full" />
                                <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900">Showtimes</h2>
                            </div>

                            <div className="space-y-6">
                                {selectedTheaters.map((theater) => (
                                    <div key={theater.id} className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 group">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-900 group-hover:text-red-600 transition-colors">{theater.name}</h3>
                                                <p className="text-slate-400 font-bold text-sm mt-1">{theater.address}</p>
                                            </div>
                                            <button className="text-red-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                                                View Map <ChevronRight size={16} />
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap gap-4">
                                            {showtimes.map((time, idx) => (
                                                <button key={idx} className="px-8 py-4 bg-white border-2 border-slate-100 rounded-2xl font-black text-slate-900 hover:bg-red-600 hover:border-red-600 hover:text-white hover:shadow-xl hover:shadow-red-600/20 transition-all duration-300">
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right: Cast & Production */}
                    <div className="lg:col-span-4 space-y-12">
                        <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-900/40 sticky top-24">
                            <h3 className="text-2xl font-black italic mb-8 border-b border-white/10 pb-4">Details</h3>
                            <div className="space-y-8">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Director</p>
                                    <p className="text-lg font-bold">Christopher Nolan</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Starring</p>
                                    <p className="text-lg font-bold leading-relaxed">Cillian Murphy, Emily Blunt, Matt Damon, Robert Downey Jr.</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Release Date</p>
                                    <p className="text-lg font-bold">July 21, 2026</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Language</p>
                                    <p className="text-lg font-bold">English (Vietnamese Subtitles)</p>
                                </div>
                            </div>

                            <button className="w-full mt-12 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                                Official Trailer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
