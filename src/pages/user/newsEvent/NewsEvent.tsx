import { useNavigate } from 'react-router-dom';
import { NEWS_EVENTS } from "../../../data/newsEvents";
import Carousel from "../../../components/features/carousel/Carousel"
import { PATH } from '../../../utils/path';

function NewsEvent() {
    const navigate = useNavigate();
    const responsiveSettings = [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
            },
        },
    ];

    return (
        <div className="bg-white min-h-screen py-16">
            <div className="container mx-auto px-32">
                {/* Section Header */}
                <h1 className="text-3xl font-black italic tracking-tighter text-slate-900 mb-12 border-l-4 border-red-600 pl-4">
                    TIN TỨC & KHUYẾN MÃI
                </h1>

                {/* News Grid */}
                <div className="w-full">
                    <Carousel responsiveSettings={responsiveSettings} slidesToShow={3} slidesToScroll={1}>
                        {NEWS_EVENTS.map((item) => (
                            <div
                                key={item.id}
                                className="px-2 cursor-pointer"
                                onClick={() => navigate(PATH.NEWS_EVENT_DETAIL.replace(':id', item.id))}
                            >
                                {/* Image Container */}
                                <div className="relative aspect-square overflow-hidden rounded-3xl mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Overlay/Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                {/* Content */}
                                <div className="px-2">
                                    <h3 className="text-lg font-black text-slate-900 leading-tight mb-3 group-hover:text-red-600 transition-colors uppercase tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-4 font-medium">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>

                {/* Load More Button */}
                <div className="mt-20 flex justify-center">
                    <button className="px-10 py-4 border-2 border-slate-200 text-slate-900 font-black rounded-2xl hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300 uppercase tracking-widest text-xs">
                        Xem thêm khuyến mãi
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewsEvent;