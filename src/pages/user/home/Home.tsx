import Banner from "./Banner"
import MovieCard from "./MovieCard"
import Carousel from "../../../components/features/carousel/Carousel"
import { useMovies } from "../../../hooks/useMovie"
import type { IMovie } from "../../../types/movie.types"

function Home() {
    const { data: movies } = useMovies()

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
                        {movies?.map((movie: IMovie) => (
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