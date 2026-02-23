import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Bill from "./Bill";
import { formatPrice } from "../../../../utils/forrmatPriceVn";
import { getLocalStorage } from "../../../../utils/localStorage";

interface PaymentProps {
    data: any;
    arrayGhe: number[];
}

function Payment({ data, arrayGhe }: PaymentProps) {
    const [price, setPrice] = useState(0);
    const user = getLocalStorage("user") || { email: "guest@example.com", phone: "0123456789" };

    const id = data?._id || "mock-id";

    useEffect(() => {
        if (arrayGhe.length === 0) {
            setPrice(0);
        } else {
            setPrice(Number(data?.tienGhe || 100000) * arrayGhe.length);
        }
    }, [arrayGhe, data]);

    return (
        <div
            style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 15px" }}
            className="w-full h-screen px-[8%] justify-between select-none block bg-white overflow-y-auto"
        >
            <div className="mx-auto py-8 text-center border-b border-dashed border-gray-200">
                <p className="text-green-500 font-semibold text-4xl">
                    {formatPrice(price)}
                </p>
            </div>

            <div className="my-3 border-b-[1px] border-gray-200">
                <div className="my-2 ">
                    <p className="font-semibold text-black text-lg">
                        {data?.suatChieuId?.movieId?.tenPhim || "Phim Mẫu"}
                    </p>
                    <p className="text-green-600 font-semibold my-2 uppercase text-sm">
                        {data?.ngayChieuId?.rapId?.tenRap}
                    </p>
                    <p className="font-medium text-gray-600 text-sm">
                        <span>{data?.gioChieu}</span>
                        <span> - </span>
                        <span>{data?.ngayChieuId?.ngaychieu}</span>
                    </p>
                </div>
            </div>

            <div className="my-3 border-b-[1px] border-gray-200">
                <div className="my-2 flex justify-between items-center">
                    <div className="text-red-500 font-bold">Ghế {arrayGhe.join(", ")}</div>
                    <div className="text-green-500 font-semibold">
                        {formatPrice(price)}
                    </div>
                </div>
            </div>

            <div className="my-3 border-b-[1px] border-gray-200">
                <div className="my-2">
                    <div className="text-gray-400 text-xs font-medium uppercase tracking-wider">Email</div>
                    <div className="text-black font-medium">{user.email}</div>
                </div>
            </div>

            <div className="my-3 border-b-[1px] border-gray-200">
                <div className="my-2">
                    <div className="text-gray-400 text-xs font-medium uppercase tracking-wider">Phone</div>
                    <div className="text-black font-medium">{user.phone}</div>
                </div>
            </div>

            <div className="my-3 border-b-[1px] border-gray-200">
                <div className="my-2 flex justify-between items-center">
                    <div>
                        <div className="text-gray-400 text-xs font-medium uppercase tracking-wider">Mã giảm giá</div>
                        <div className="text-black font-medium text-sm italic">
                            Tạm thời không hỗ trợ...
                        </div>
                    </div>
                    <button className="bg-gray-400 px-3 py-1 text-white text-xs rounded font-bold hover:bg-gray-500 transition-colors">
                        ÁP DỤNG
                    </button>
                </div>
            </div>

            <div className="my-6">
                <div className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">
                    Hình thức thanh toán
                </div>
                {arrayGhe && arrayGhe.length > 0 ? (
                    <Bill totalPrice={price} arrayGhe={arrayGhe} id={id} />
                ) : (
                    <div className="text-red-500 font-medium text-sm italic bg-red-50 p-3 rounded-lg border border-red-100 uppercase">
                        Vui lòng chọn ghế để hiển thị phương thức thanh toán phù hợp
                    </div>
                )}
            </div>

            <div className="text-center py-6 flex items-start">
                <AlertCircle className="w-4 h-4 mr-2 mt-0.5 text-orange-500" />
                <div className="text-[10px] text-gray-500 text-left leading-relaxed">
                    <span>Vé đã mua không thể đổi hoặc hoàn tiền.</span>
                    <span> Mã vé sẽ được gửi qua tin nhắn </span>
                    <span className="text-orange-400 font-bold uppercase">ZMS</span>
                    <span> (tin nhắn Zalo) và </span>
                    <span className="text-orange-400 font-bold uppercase">Email</span> đã nhập.
                </div>
            </div>
        </div>
    );
}

export default Payment;
