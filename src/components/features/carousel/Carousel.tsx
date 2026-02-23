import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

type CarouselProps = {
    children: React.ReactNode,
    dots?: boolean,
    showSlider?: boolean,
    showSliderScroll?: boolean,
    responsiveSettings?: any,
    autoplay?: boolean,
    slidesToShow?: number,
    slidesToScroll?: number
}

export default function Carousel({
    children,
    dots = false,
    showSlider = true,
    showSliderScroll,
    responsiveSettings,
    autoplay = true,
    slidesToShow = 2,
    slidesToScroll = 2
}: CarouselProps) {
    const settings = {
        dots: dots,
        infinite: showSlider,
        speed: 500,
        slidesToShow: showSliderScroll ? 1 : slidesToShow,
        slidesToScroll: showSliderScroll ? 1 : slidesToScroll,
        autoplay: autoplay,
        autoplaySpeed: 7000,
        arrows: true,
        responsive: responsiveSettings
    };
    return (
        <div className="w-full overflow-hidden">
            <Slider {...settings}>
                {children}
            </Slider>
        </div>
    );
}