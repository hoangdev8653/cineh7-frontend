import Banner from "./Banner"
import MovieCard from "./MovieCard"
import Carousel from "../../../components/features/carousel/Carousel"
import { useMovies } from "../../../hooks/useMovie"
import { useNewsEvents } from "../../../hooks/useNewsEvent"
import type { IMovie } from "../../../types/movie.types"


function Home() {
    const { data: movies } = useMovies()
    const { data: newsEvents } = useNewsEvents()

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
            <div className="container mx-auto py-6 px-32">
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
            <div className="container mx-auto py-6 px-32">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Tin tức sự kiện</h2>
                    <button className="text-red-600 font-bold cursor-pointer hover:underline">Xem thêm</button>
                </div>
                <div className="w-full">
                    <Carousel responsiveSettings={responsiveSettings} slidesToShow={3} slidesToScroll={1}>
                        {newsEvents?.map((item: any, index: number) => (
                            <div
                                key={index}
                                className="px-2 cursor-pointer"
                            // onClick={() => Navigate(PATH.NEWS_EVENT_DETAIL.replace(':id', item.id))}
                            >
                                {/* Image Container */}
                                <div className="relative aspect-square overflow-hidden rounded-3xl mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                                    <img
                                        src={item?.thumbnail}
                                        alt={item?.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Overlay/Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                {/* Content */}
                                <div className="px-2">
                                    <h3 className="text-lg font-black text-slate-900 leading-tight mb-3 group-hover:text-red-600 transition-colors uppercase tracking-tight">
                                        {item?.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-4 font-medium">
                                        {item?.content?.summary}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
            <div className="container mx-auto py-6 px-32 text-slate-700">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                    <h2 className="text-2xl font-bold text-slate-900 uppercase">Trang chủ</h2>
                </div>

                <div className="space-y-6 text-[15px] leading-relaxed">
                    <p>
                        <span className="font-bold text-blue-700">CineH7</span> là một trong những công ty tư nhân đầu tiên về điện ảnh được thành lập từ năm 2003, đã khẳng định thương hiệu là 1 trong 10 địa điểm vui chơi giải trí được yêu thích nhất. Ngoài hệ thống rạp chiếu phim hiện đại, thu hút hàng triệu lượt người đến xem, <span className="font-bold text-blue-700">CineH7</span> còn hấp dẫn khán giả bởi không khí thân thiện cũng như chất lượng dịch vụ hàng đầu.
                    </p>

                    <p>
                        Đến website <span className="text-blue-600 hover:underline cursor-pointer">cineh7.com</span>, khách hàng sẽ dễ dàng tham khảo các <span className="italic text-blue-600">phim hay nhất</span>, <span className="italic text-blue-600">phim mới nhất</span> đang chiếu hoặc sắp chiếu luôn được cập nhật thường xuyên. <span className="italic text-blue-600">Lịch chiếu</span> tại tất cả hệ thống <span className="italic text-blue-600">rạp chiếu phim</span> của <span className="font-bold text-blue-700">CineH7</span> cũng được cập nhật đầy đủ hàng ngày hàng giờ trên trang chủ.
                    </p>

                    <p>
                        Giờ đây đặt vé tại <span className="font-bold text-blue-700">CineH7</span> càng thêm dễ dàng chỉ với vài thao tác vô cùng đơn giản. Để mua vé, hãy vào tab Mua vé. Quý khách có thể chọn Mua vé theo phim, theo rạp, hoặc theo ngày. Sau đó, tiến hành mua vé theo các bước hướng dẫn. Chỉ trong vài phút, quý khách sẽ nhận được tin nhắn và email phản hồi Đặt vé thành công của <span className="font-bold text-blue-700">CineH7</span>. Quý khách có thể dùng tin nhắn lấy vé tại quầy vé của <span className="font-bold text-blue-700">CineH7</span> hoặc quét mã QR để một bước vào rạp mà không cần tốn thêm bất kỳ công đoạn nào nữa.
                    </p>

                    <p>
                        Nếu bạn đã chọn được <span className="italic text-blue-600">phim hay</span> để xem, hãy đặt vé cực nhanh bằng box <span className="italic">Mua Vé Nhanh</span> ngay từ <span className="italic text-blue-600">Trang Chủ</span>. Chỉ cần một phút, tin nhắn và email phản hồi của <span className="font-bold text-blue-700">CineH7</span> sẽ gửi ngay vào điện thoại và hộp mail của bạn.
                    </p>

                    <p>
                        Nếu chưa quyết định sẽ xem <span className="italic text-blue-600">phim mới</span> nào, hãy tham khảo các bộ <span className="italic text-blue-600">phim hay</span> trong mục <span className="italic text-blue-600">Phim Đang Chiếu</span> cũng như <span className="italic text-blue-600">Phim Sắp Chiếu</span> tại <span className="italic text-blue-600">rạp chiếu phim</span> bằng cách vào mục <span className="italic text-blue-600">Bình Luận Phim</span> ở <span className="italic text-blue-600">Góc Điện Ảnh</span> để đọc những bài bình luận chân thật nhất, tham khảo và cân nhắc. Sau đó, chỉ việc đặt vé bằng box <span className="italic">Mua Vé Nhanh</span> ngay ở đầu trang để chọn được suất chiếu và chỗ ngồi vừa ý nhất.
                    </p>

                    <p>
                        <span className="font-bold text-blue-700">CineH7</span> luôn có những chương trình <span className="italic text-blue-600">khuyến mãi, ưu đãi</span>, quà tặng vô cùng hấp dẫn như giảm giá vé, tặng vé xem phim miễn phí, tăng Combo, tặng quà phim... dành cho các khách hàng.
                    </p>

                    <p>
                        Trang web <span className="text-blue-600 hover:underline cursor-pointer">cineh7.com</span> còn có mục Góc Điện Ảnh - nơi lưu trữ dữ liệu về phim, diễn viên và đạo diễn, những bài viết chuyên sâu về điện ảnh, hỗ trợ người yêu phim dễ dàng hơn trong việc lựa chọn phim và bổ sung thêm kiến thức về điện ảnh cho bản thân. Ngoài ra, vào mỗi tháng, <span className="font-bold text-blue-700">CineH7</span> cũng giới thiệu các <span className="italic text-blue-600">phim sắp chiếu</span> hot nhất trong mục <span className="italic text-blue-600">Phim Hay Tháng</span>.
                    </p>

                    <p>
                        Hiện nay, <span className="font-bold text-blue-700">CineH7</span> đang ngày càng phát triển hơn nữa với các chương trình đặc sắc, các khuyến mãi hấp dẫn, đem đến cho khán giả những bộ phim bom tấn của thế giới và Việt Nam nhanh chóng và sớm nhất.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home