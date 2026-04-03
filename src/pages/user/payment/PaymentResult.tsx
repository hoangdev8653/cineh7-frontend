import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Calendar, MapPin, Armchair, Ticket, Home, ArrowRight, Loader2 } from "lucide-react";
import { getOrderById } from "../../../apis/order";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const PaymentResult = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const orderId = searchParams.get("orderId");
    const status = searchParams.get("status");
    const [orderData, setOrderData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails();
        } else {
            setLoading(false);
        }
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            const response = await getOrderById(orderId!);
            // axios response.data should be the body: { data: order, message, statusCode }
            setOrderData(response.data?.data || response.data);
        } catch (error) {
            console.error("Error fetching order:", error);
            toast.error("Không thể lấy thông tin đơn hàng");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-white">
                <Loader2 className="w-12 h-12 animate-spin text-indigo-500 mb-4" />
                <p className="text-lg font-medium animate-pulse tracking-wide">Đang xác thực giao dịch...</p>
            </div>
        );
    }

    const isSuccess = status === "success";

    return (
        <div className="min-h-screen bg-[#0f172a] pt-24 pb-12 px-4 flex items-center justify-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                {/* Status Header */}
                <div className="text-center mb-10">
                    {isSuccess ? (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >
                            <div className="relative inline-block mb-6">
                                <div className="absolute inset-0 blur-2xl bg-green-500/30 rounded-full" />
                                <CheckCircle className="w-16 h-16 text-green-500 relative z-10 mx-auto" />
                            </div>
                            <h1 className="text-3xl font-black text-white mb-3 tracking-tight">THANH TOÁN THÀNH CÔNG!</h1>
                            <p className="text-slate-400 text-sm font-medium px-6">Hệ thống đã xác nhận vé của bạn. Chúc bạn có những phút giây tuyệt vời tại CineH7!</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <div className="relative inline-block mb-6">
                                <div className="absolute inset-0 blur-2xl bg-red-500/20 rounded-full" />
                                <XCircle className="w-16 h-16 text-red-500 relative z-10 mx-auto" />
                            </div>
                            <h1 className="text-3xl font-black text-white mb-3 tracking-tight text-red-500">MUA VÉ THẤT BẠI</h1>
                            <p className="text-slate-400 text-sm font-medium px-6">Đã có lỗi xảy ra hoặc bạn đã hủy giao dịch. Đừng lo lắng, hãy thử lại nhé!</p>
                        </motion.div>
                    )}
                </div>

                {isSuccess && orderData && (
                    <div className="relative">
                        {/* Ticket Background with Glassmorphism */}
                        <div className="bg-slate-800/40 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                            {/* Decorative Cutouts */}
                            <div className="absolute top-[55%] -left-4 w-8 h-8 bg-[#0f172a] rounded-full z-10 border-r border-white/10" />
                            <div className="absolute top-[55%] -right-4 w-8 h-8 bg-[#0f172a] rounded-full z-10 border-l border-white/10" />
                            
                            {/* Movie Header Area */}
                            <div className="p-8 pb-4 relative overflow-hidden">
                                <div className="flex gap-4 items-start relative z-10">
                                    <div className="w-20 h-28 rounded-xl bg-slate-700/50 flex-shrink-0 overflow-hidden border border-white/10 shadow-lg">
                                        {orderData.showtime?.movie?.poster ? (
                                            <img src={orderData.showtime.movie.poster} className="w-full h-full object-cover" />
                                        ) : (
                                            <Ticket className="w-10 h-10 text-white/10 m-auto mt-9" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-black text-white leading-tight uppercase mb-2 tracking-tight">
                                            {orderData.showtime?.movie?.title || "Thông tin vé"}
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300">
                                                {orderData.showtime?.room?.type || "2D"}
                                            </span>
                                            <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 border border-indigo-500/30 text-[10px] font-bold text-indigo-400 uppercase">
                                                {orderData.status || "COMPLETED"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Dotted Line */}
                            <div className="px-8 my-4">
                                <div className="h-px w-full border-t border-dashed border-white/10" />
                            </div>

                            {/* Ticket Details */}
                            <div className="p-8 pt-2 space-y-6">
                                <div className="grid grid-cols-2 gap-y-6">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            <Calendar className="w-3 h-3" /> Ngày & Giờ
                                        </div>
                                        <p className="text-sm font-bold text-white">
                                            {orderData.showtime?.date ? dayjs(orderData.showtime.date).format("DD.MM.YYYY") : "N/A"}
                                        </p>
                                        <p className="text-xs text-indigo-400 font-bold">{orderData.showtime?.startTime || "--:--"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            <MapPin className="w-3 h-3" /> Rạp & Phòng
                                        </div>
                                        <p className="text-sm font-bold text-white truncate">{orderData.showtime?.theater?.name || "CineH7 Cinema"}</p>
                                        <p className="text-xs text-indigo-400 font-bold">{orderData.showtime?.room?.name || "P.01"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            <Armchair className="w-3 h-3" /> Vị trí ghế
                                        </div>
                                        <p className="text-sm font-bold text-white h-5 overflow-hidden text-ellipsis">
                                            {orderData.tickets?.map((t: any) => t.seat_name).join(", ") || orderData.seats?.map((s: any) => s.name).join(", ") || "N/A"}
                                        </p>
                                    </div>
                                    <div className="text-right flex flex-col items-end">
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Tổng phí</div>
                                        <p className="text-xl font-black text-indigo-400 leading-none">
                                            {(orderData.totalAmount || orderData.total_amount)?.toLocaleString("vi-VN")}đ
                                        </p>
                                    </div>
                                </div>

                                {/* QR Area */}
                                <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center">
                                    <div className="bg-white p-3 rounded-2xl shadow-xl shadow-black/20">
                                        <img 
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${orderId}`} 
                                            alt="Ticket QR"
                                            className="w-32 h-32"
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-4">
                                        #{orderId?.split("-")[0].toUpperCase() || "ORDID"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Failed State Action */}
                {!isSuccess && (
                     <div className="bg-slate-800/30 border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                            <Ticket className="w-8 h-8 text-red-400 opacity-50" />
                        </div>
                        <p className="text-white mb-6">Đã có lỗi xảy ra hoặc giao dịch của bạn bị hủy. Bạn có thể thử lại bằng cách quay lại trang thanh toán.</p>
                        <button 
                            onClick={() => window.history.back()}
                            className="w-full py-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold transition-all flex items-center justify-center gap-2"
                        >
                            Quay lại và thử lại
                        </button>
                    </div>
                )}

                {/* Common Navigation */}
                <div className="mt-8 flex gap-4">
                    <button 
                        onClick={() => navigate("/")}
                        className="flex-1 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                    >
                        <Home className="w-5 h-5" />
                        Về trang chủ
                    </button>
                    {isSuccess && (
                        <button 
                            onClick={() => navigate("/profile")}
                            className="flex-1 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-bold transition-all flex items-center justify-center gap-2"
                        >
                            Lịch sử đặt vé
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentResult;
