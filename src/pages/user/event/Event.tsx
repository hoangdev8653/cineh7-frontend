import { Link, useNavigate } from 'react-router-dom';
import { PATH } from '../../../utils/path';
import { useEvents } from '../../../hooks/useEvent';
import { useMovies } from '../../../hooks/useMovie';

function Event() {
    const navigate = useNavigate();
    const { data: newsEvents } = useEvents();
    const { data: movies } = useMovies();

    return (
        <div className="bg-white min-h-screen py-12">
            <div className="container mx-auto px-24">
                <h1 className="text-3xl font-black italic tracking-tighter text-slate-900 mb-12 border-l-4 border-red-600 pl-4 uppercase">
                    Tin tức & Khuyến mãi
                </h1>

                <div className='w-full flex gap-10 items-start'>
                    <div className="w-9/12 grid grid-cols-3 gap-x-6 gap-y-10">
                        {newsEvents?.map((item: any, index: number) => (
                            <div
                                key={index}
                                className="cursor-pointer group"
                                onClick={() => navigate(PATH.EVENT_DETAIL.replace(':id', item.id))}
                            >
                                <div className="relative overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500 ">
                                    <img
                                        src={item?.thumbnail}
                                        alt={item?.title}
                                        className="w-full h-[380px] object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                <div className="px-2">
                                    <h3 className="text-lg font-black text-slate-900 leading-tight mb-3 group-hover:text-red-600 transition-colors uppercase tracking-tight line-clamp-2">
                                        {item?.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 font-medium">
                                        {item?.content?.summary}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 space-y-8">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-1 h-6 bg-blue-600" />
                            <h2 className="text-xl font-bold text-slate-900 uppercase">Phim đang chiếu</h2>
                        </div>
                        <div className="space-y-6">
                            {movies?.data?.movie?.slice(0, 3)?.map((movie: any, index: number) => (
                                <div key={index} className="group cursor-pointer">
                                    <div className="relative overflow-hidden rounded-xl mb-3 shadow-md aspect-[2/3] w-full">
                                        <img
                                            src={movie?.poster}
                                            alt={movie?.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <a href={`/movie/${movie.id}`}>
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <button className="bg-orange-500 cursor-pointer text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm hover:bg-orange-600 transition-colors">
                                                    <span>🎟️</span> Mua vé
                                                </button>
                                            </div>
                                        </a>

                                        <div className="absolute bottom-3 right-3 flex flex-col gap-1.5 items-end z-10">
                                            <div className="bg-white/95 px-2 py-1 rounded-lg text-[11px] font-black text-slate-900 flex items-center gap-1 shadow-sm">
                                                <span className="text-yellow-500">⭐</span> {movie?.rating}
                                            </div>
                                            <div className="bg-orange-500/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[11px] font-black text-white shadow-sm">
                                                {movie?.duration} Phút
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {movie?.title}
                                    </h3>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end">
                            <Link to={PATH.SHOWTIME}>
                                <button className="text-red-500 font-bold text-sm hover:bg-red-500 hover:text-white cursor-pointer border-2 border-red-500 px-4 py-2 ">
                                    Xem thêm &gt;
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Event;