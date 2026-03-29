import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Bill from "./Bill";
import { formatPrice } from "../../../../utils/forrmatPriceVn";
import { getLocalStorage } from "../../../../utils/localStorage";
import { useOrderMutations } from "../../../../hooks/useOrder";
import type { OrderDto } from "../../../../types/order.types";

interface PaymentProps {
    data: any;
    arrayGhe: string[];
    showtimeId: string;
}

function Payment({ data, arrayGhe, showtimeId }: PaymentProps) {
    const [price, setPrice] = useState(0);
    const [selectedMethod, setSelectedMethod] = useState<string>('paypal');
    const user = getLocalStorage("user") || { email: "guest@example.com", phone: "0123456789" };
    const { createOrderMutation } = useOrderMutations();


    useEffect(() => {
        if (arrayGhe.length === 0) {
            setPrice(0);
        } else {
            setPrice(Number(data?.tienGhe || 100000) * arrayGhe.length);
        }
    }, [arrayGhe, data]);


    const handleCreateOrder = () => {
        const orderDto: OrderDto = {
            showtime_id: showtimeId,
            seat_ids: arrayGhe,
        }
        console.log(orderDto);

        // createOrderMutation.mutate(orderDto);
    }

    // console.log(arrayGhe);


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
                    <div className="text-red-500 font-bold">
                        Ghế {arrayGhe.map(id => {
                            const seat = data?.danhSachGhe?.find((s: any) => s.id === id);
                            return seat ? `${seat.row}${seat.column}` : id;
                        }).join(", ")}
                    </div>
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
                <div className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-4">
                    Hình thức thanh toán
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                        { id: 'paypal', name: 'PayPal', icon: '💳' },
                        { id: 'momo', name: 'Ví MoMo', icon: '🌸' },
                        { id: 'vnpay', name: 'VNPay', icon: '🏦' },
                        { id: 'zalopay', name: 'ZaloPay', icon: '📱' }
                    ].map((method) => (
                        <div
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${selectedMethod === method.id ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'}`}
                        >
                            <span className="text-2xl disable-select">{method.icon}</span>
                            <span className={`text-xs font-semibold ${selectedMethod === method.id ? 'text-green-700' : 'text-gray-600'}`}>
                                {method.name}
                            </span>
                        </div>
                    ))}
                </div>

                {arrayGhe && arrayGhe.length > 0 ? (
                    <div>
                        <Bill totalPrice={price} arrayGhe={arrayGhe} showtimeId={showtimeId} selectedMethod={selectedMethod} />
                    </div>
                ) : (
                    <div className="text-red-500 font-medium text-sm italic bg-red-50 p-3 rounded-lg border border-red-100 uppercase text-center">
                        Vui lòng chọn ghế trước
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
