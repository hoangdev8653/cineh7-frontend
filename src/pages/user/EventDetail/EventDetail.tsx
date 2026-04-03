import { useParams, Link } from 'react-router-dom';
import { Search, ChevronLeft } from 'lucide-react';
import { PATH } from '../../../utils/path';
import { useEventDetail } from '../../../hooks/useEvent';
import { useMovies } from "../../../hooks/useMovie"

function EventDetail() {
    const { id } = useParams();
    const { data: events } = useEventDetail(id || "");
    const { data: movies } = useMovies();
    const tags = events?.content?.tags?.map((item: any) => item);

    return (
        <div className="bg-white min-h-screen pb-20 font-sans text-slate-800">
            <div className="border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-30">
                <div className="container mx-auto px-4 md:px-16 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-green-500 rounded-full" />
                        <nav className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-tight">
                            <Link to="/" className="text-slate-900 hover:text-green-600 transition-colors">CineH7</Link>
                            <span className="text-slate-300">/</span>
                            <Link to={PATH.EVENT} className="text-slate-900 hover:text-green-600 transition-colors">Khuyến mãi</Link>
                            <span className="text-slate-300">/</span>
                            <span className="text-slate-400 truncate max-w-[150px] md:max-w-none">{events?.title}</span>
                        </nav>
                    </div>

                    <div className="relative group max-w-sm w-full">
                        <input
                            type="text"
                            placeholder="Tìm kiếm nội dung"
                            className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 px-4 pr-12 text-xs font-medium focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={16} />
                    </div>
                </div>
            </div>
            <div className='flex mx-auto'>
                <div className='w-8/12'>
                    <div className="container mx-auto px-4 md:px-16 py-6">
                        <div className="max-w-4xl">
                            <Link to={PATH.EVENT} className="inline-flex items-center gap-2 text-slate-400 hover:text-red-600 mb-8 font-bold text-xs uppercase tracking-widest transition-colors">
                                <ChevronLeft size={16} />
                                Quay lại danh sách
                            </Link>

                            <div className="mb-12">
                                <p className="text-slate-700 leading-relaxed text-lg mb-8">
                                    Bạn đang tìm kiếm những ưu đãi hấp dẫn nhất tại hệ thống rạp <span className="font-black text-slate-900 underline decoration-green-500 decoration-2">CineH7</span>?
                                    <br />
                                    <span className="font-black text-slate-900">{events?.title}</span> chính là lựa chọn hoàn hảo giúp bạn tận hưởng trọn vẹn bộ phim yêu thích mà vẫn tiết kiệm chi phí.
                                </p>

                                <div className="flex items-center gap-3 mb-8">
                                    <span className="w-1.5 h-8 bg-green-500 rounded-full" />
                                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">
                                        {events?.title} GỒM NHỮNG GÌ?
                                    </h2>
                                </div>

                                <ul className="space-y-4 mb-10 overflow-hidden">
                                    <li className="flex items-start gap-3 text-slate-700 font-medium">
                                        <span className="text-slate-900 font-black text-xl mt-[-4px]">•</span>
                                        <span className="font-black">{events?.content?.summary}</span>
                                    </li>
                                </ul>

                                {events?.content?.sections?.map((section: any, index: number) => (
                                    <p key={index} className="text-slate-600 leading-relaxed mb-6">
                                        {section.title}
                                    </p>
                                ))}

                                <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 mb-12 border border-slate-100 group">
                                    <img
                                        src={events?.thumbnail}
                                        alt={events?.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                </div>

                                <div className="space-y-8">
                                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 uppercase italic tracking-tighter">
                                        <span className="w-1.5 h-6 bg-green-500 rounded-full shrink-0" />
                                        Tags:
                                        {tags?.map((tag: any) => (
                                            <span key={tag}>{tag}</span>
                                        ))}
                                    </h3>
                                    <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                                        <p className="text-slate-600 font-medium">
                                            Ưu đãi được áp dụng <span className="font-black text-slate-900 underline decoration-red-500">từ nay đến khi có thông báo mới</span> tại tất cả các cụm rạp CineH7 trên toàn quốc.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-10 flex items-center justify-between">
                                <Link to={PATH.EVENT} className="text-slate-900 font-black text-xs uppercase tracking-widest hover:text-green-600 transition-colors">
                                    Khám phá tin khác
                                </Link>
                                <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg hover:shadow-green-500/20 active:scale-95">
                                    Chia sẻ ưu đãi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex-1'>
                    <div className='container mx-auto px-4 md:px-16 py-6'>

                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-1 h-6 bg-blue-600" />
                            <h2 className="text-xl font-bold text-slate-900 uppercase">Phim đang chiếu</h2>
                        </div>
                        {movies?.data?.movie?.slice(0, 3)?.map((movie: any, index: number) => (
                            <div key={index} className="group cursor-pointer mb-6">
                                <div className="relative overflow-hidden rounded-xl mb-3 shadow-md h-[280px] w-full">
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
                    <div className="flex justify-center">
                        <Link to={PATH.MOVIE}>
                            <button className="text-red-500 font-bold text-sm hover:bg-red-500 hover:text-white cursor-pointer border-2 border-red-500 px-4 py-2 ">
                                Xem thêm &gt;
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventDetail;