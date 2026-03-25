import Carousel from '../../../components/features/carousel/Carousel'
import { useMovies } from '../../../hooks/useMovie'

function Banner() {
    const { data: movies } = useMovies();

    const responsiveSettings = [
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 2,
                dots: true,
            },
        },
        {
            breakpoint: 720,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
            },
        },
        {
            breakpoint: 493,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
            },
        },
    ];
    return (
        <div className='w-full'>
            <Carousel responsiveSettings={responsiveSettings} showSliderScroll={true} dots={true} showSlider={true}>
                {movies?.data?.movie?.map((movie: any) => (
                    <div className="w-full">
                        <img className="w-full object-cover h-[600px]" src={movie.poster} alt={movie.title} />
                    </div>
                ))}

            </Carousel>
        </div>
    )
}

export default Banner