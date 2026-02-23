import Banner from "./Banner"
import MovieCard from "./MovieCard"
import { SAMPLE_MOVIES } from "../../../data/movies"
import Carousel from "../../../components/features/carousel/Carousel"

function Home() {
    const responsiveSettings = [
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
                initialSlide: 4,
            },
        },
        {
            breakpoint: 720,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 493,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
            },
        },
    ];

    return (
        <div className="bg-white">
            <Banner />
            <div className="container mx-auto py-10 px-32">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Phim đang chiếu</h2>
                <div className="w-full ">
                    <Carousel responsiveSettings={responsiveSettings} slidesToShow={4} slidesToScroll={1}>
                        {SAMPLE_MOVIES.map((movie) => (
                            <div key={movie.id} className="px-2">
                                <MovieCard {...movie} />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default Home