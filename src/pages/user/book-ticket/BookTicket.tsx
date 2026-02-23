import { useState } from "react";
import Payment from "./payment/Payment";
import "./BookTicket.css";
import ExpiredTime from "./ExpiredTime";
import { getLocalStorage } from "../../../utils/localStorage";
import { SAMPLE_SEATS } from "../../../data/seats";
import Screen from "../../../assets/screen.png"

function BookTicket() {
    const [arrayGhe, setArrayGhe] = useState<number[]>([]);
    const storedUser = getLocalStorage("user");
    const user = storedUser || {
        username: "Khách hàng mẫu",
        avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    };
    const data = {
        _id: "show-67890",
        danhSachGhe: SAMPLE_SEATS,
        gioChieu: "19:00",
        tienGhe: 100000,
        ngayChieuId: {
            ngaychieu: "24/02/2026",
            rapId: {
                tenRap: "CineH7 Cinema - Nguyễn Trãi",
                hinhAnh: "https://homepage.momocdn.net/placeholder/theater.png",
            }
        },
        suatChieuId: {
            movieId: {
                tenPhim: "Độc Đạo",
                hinhAnh: "https://homepage.momocdn.net/placeholder/movie.png",
            }
        },
        giaVe: 100000
    };

    const handleAddClass = (soGhe: number) => {
        setArrayGhe((prevArrayGhe) => {
            const newArrayGhe = [...prevArrayGhe];
            const selectedIndex = newArrayGhe.indexOf(soGhe);

            if (selectedIndex !== -1) {
                newArrayGhe.splice(selectedIndex, 1);
            } else {
                newArrayGhe.push(soGhe);
            }
            return newArrayGhe;
        });
    };
    const imgageDeafaut = "https://cdn-icons-png.flaticon.com/512/149/149071.png";


    return (
        <div className="datve w-full bg-white flex min-h-screen">
            <div className="w-[70%] border-r border-gray-100">
                <div className="w-full">
                    <div style={{ boxShadow: "0 0 15px rgb(0 0 0 / 10%)" }} className="bg-white">
                        <div className="ml-8 px-[10px] pt-[10px] pb-[20px] flex justify-between items-center">
                            <ol className="flex items-center w-full max-w-3xl">
                                <li className="relative flex w-full items-center text-blue-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block">
                                    <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full shrink-0">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 12">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                        </svg>
                                    </span>
                                    <p className="absolute top-14 left-[-16px] text-xs font-bold whitespace-nowrap">CHỌN GHẾ</p>
                                </li>
                                <li className="relative flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block">
                                    <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shrink-0">
                                        <span className="text-gray-500 font-bold">2</span>
                                    </span>
                                    <p className="absolute top-14 left-[-16px] text-xs font-bold text-gray-400 whitespace-nowrap">THANH TOÁN</p>
                                </li>
                                <li className="relative flex items-center">
                                    <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shrink-0">
                                        <span className="text-gray-500 font-bold">3</span>
                                    </span>
                                    <p className="absolute top-14 left-[-16px] text-xs font-bold text-gray-400 whitespace-nowrap">XÁC NHẬN</p>
                                </li>
                            </ol>
                            <div className="mx-4 flex flex-col items-center">
                                <img
                                    className="rounded-full w-[45px] h-[45px] object-cover mb-1 border-2 border-slate-200"
                                    src={user?.avatar || imgageDeafaut}
                                    alt="avatar"
                                />
                                <div className="text-xs text-gray-500 font-medium">
                                    {user?.username || "Guest"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="chair flex mt-4">
                        <div className="screen py-0 px-[5%] relative block w-full">
                            <div className="flex mb-4 justify-between items-center bg-slate-50 p-4 rounded-xl">
                                <div className="flex items-center">
                                    <img
                                        className="w-[50px] h-[50px] rounded-lg shadow-sm"
                                        src={data?.ngayChieuId?.rapId?.hinhAnh}
                                        alt="theater"
                                    />
                                    <div className="ml-4">
                                        <p className="text-green-600 font-bold uppercase text-sm">
                                            {data?.ngayChieuId?.rapId?.tenRap}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            <span className="font-bold text-slate-700">{data?.gioChieu}</span>
                                            <span className="mx-2">|</span>
                                            <span>{data?.ngayChieuId?.ngaychieu}</span>
                                        </p>
                                    </div>
                                </div>
                                <ExpiredTime arrayGhe={arrayGhe} />
                            </div>

                            <div className="overflow-x-auto">
                                <div className="w-full flex flex-col items-center">
                                    <div className="w-full mb-4 px-10">
                                        <img src={Screen} alt="screen" className="w-full" />
                                    </div>

                                    <div className="ghe w-full mb-8 px-12">
                                        {data?.danhSachGhe?.map((item: any, index: number) => (
                                            <div key={index} className="flex justify-center p-1">
                                                <button
                                                    data-seat={item.soGhe}
                                                    disabled={item.trangThai === "DaDat"}
                                                    onClick={() => handleAddClass(item.soGhe)}
                                                    className={`
                            ${item.trangThai === "DaDat" ? "gheDaChon cursor-not-allowed" : "cursor-pointer"}
                            ${arrayGhe.includes(item.soGhe) ? "selected" : ""}
                            status relative transition-transform hover:scale-110
                          `}
                                                >
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        width={32}
                                                        height={32}
                                                        className={`${item.loaiGhe === "Vip" ? "gheVip" : "gheThuong"}`}
                                                    >
                                                        <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H4c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1z"></path>
                                                    </svg>
                                                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white opacity-0 hover:opacity-100">
                                                        {item.soGhe}
                                                    </span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full border-t border-slate-200 my-4"></div>
                                    <div className="flex justify-center gap-12 mt-4 mb-8 rounded-2xl w-full">
                                        <div className="flex flex-col items-center gap-2">
                                            <svg viewBox="0 0 24 24" width={24} className="gheThuong"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H4c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1z"></path></svg>
                                            <p className="text-xs text-gray-500 font-medium whitespace-nowrap">Ghế Thường</p>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <svg viewBox="0 0 24 24" width={24} className="gheVip"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H4c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1z"></path></svg>
                                            <p className="text-xs text-gray-500 font-medium whitespace-nowrap">Ghế VIP</p>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <svg viewBox="0 0 24 24" width={24} className="gheDangChon"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H4c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1z"></path></svg>
                                            <p className="text-xs text-gray-500 font-medium whitespace-nowrap">Đang Chọn</p>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <svg viewBox="0 0 24 24" width={24} className="gheDaChon"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H4c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1z"></path></svg>
                                            <p className="text-xs text-gray-500 font-medium whitespace-nowrap">Đã Đặt</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[30%] shadow-[-10px_0_30px_rgba(0,0,0,0.05)] z-10">
                <Payment data={data} arrayGhe={arrayGhe} />
            </div>
        </div>
    );
}

export default BookTicket;
