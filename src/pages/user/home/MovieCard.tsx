import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../utils/path';

const MovieCard = (movie: any) => {
    const { id, title, metadata, image_url } = movie;
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(PATH.MOVIE_DETAIL.replace(':id', id))}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer "
        >
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl">
                <img
                    src={image_url}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer ">
                    <button className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 shadow-lg shadow-red-600/40">
                        <Play fill="currentColor" size={24} />
                    </button>
                </div>

                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/20">
                    <span className="text-yellow-400 font-bold text-xs">★ {metadata?.rating}</span>
                </div>
            </div>

            <div className="p-4">
                <div className="flex gap-2 mb-2">
                    {metadata?.genre && (
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">
                            {metadata.genre}
                        </span>
                    )}
                    {metadata?.language && (
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">
                            {metadata.language?.split(' - ')[0]}
                        </span>
                    )}
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
                    {title}
                </h3>
                <button className="cursor-pointer w-full mt-4 py-2.5 bg-slate-100 hover:bg-red-600 hover:text-white text-slate-800 text-sm font-bold rounded-xl transition-all">
                    Đặt vé ngay
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
