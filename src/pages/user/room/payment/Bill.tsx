import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useOrderMutations } from "../../../../hooks/useOrder";

interface BillProps {
    totalPrice: number;
    arrayGhe: string[];
    showtimeId: string;
    selectedMethod: string;
}

function Bill({ totalPrice, arrayGhe, showtimeId, selectedMethod }: BillProps) {
    const navigate = useNavigate();
    const { createOrderMutation } = useOrderMutations();
    async function createOrder(data: any, actions: any) {
        console.log(`Creating order for ${showtimeId} with ${arrayGhe.length} seats.`);
        return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
                {
                    description: "Thanh toán vé xem phim CineH7",
                    amount: {
                        value: (totalPrice / 25000).toFixed(2),
                    },
                },
            ],
        });
    }

    async function onApprove(data: any, actions: any) {
        const order = await actions.order.capture();
        if (order.status === "COMPLETED") {
            toast.success("Thanh toán thành công! Đang chuyển hướng...");
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } else {
            toast.error("Thanh toán thất bại");
        }
    }

    const handleMockCheckout = () => {
        toast.info(`Đang xử lý thanh toán qua ${selectedMethod.toUpperCase()}...`);
        setTimeout(() => {
            // Mock API call or Order flow
            // createOrderMutation.mutate({
            //     showtime_id: id,
            //     seat_ids: arrayGhe,
            // }, {
            //     onSuccess: () => {
            //         toast.success("Thanh toán thành công! Đang chuyển hướng...");
            //         setTimeout(() => {
            //             navigate("/");
            //         }, 3000);
            //     },
            //     onError: () => {
            //         toast.error("Thanh toán thất bại");
            //     }
            // });
            // console.log(totalPrice, arrayGhe, showtimeId, selectedMethod);
            console.log("totalPrice", totalPrice);
            console.log("arrayGhe", arrayGhe);
            console.log("showtimeId", showtimeId);
            console.log("selectedMethod", selectedMethod);


        }, 1500);
    }

    if (selectedMethod === 'paypal') {
        return (
            <PayPalScriptProvider options={{ "clientId": "AbZfmwSzV_Vu8igfODlqz0BqR4kZ7Lyao5MUHlmdrgV3Rys0YIurkHKLsngtSPdlXhHxRXwe1uwiAA59" }}>
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                />
            </PayPalScriptProvider>
        );
    }

    // Generic Mock Checkout button for Momo, ZaloPay, VNPay
    const methodColors: Record<string, string> = {
        momo: 'bg-[#A50064] hover:bg-[#8A0053]',
        vnpay: 'bg-[#005BAA] hover:bg-[#004A8B]',
        zalopay: 'bg-[#008FE5] hover:bg-[#0074BD]',
        cash: 'bg-green-600 hover:bg-green-700'
    };
    const buttonColor = methodColors[selectedMethod] || 'bg-slate-800 hover:bg-slate-900';

    return (
        <button
            onClick={handleMockCheckout}
            disabled={createOrderMutation.isPending}
            className={`w-full py-4 rounded-lg text-white font-bold text-lg transition-colors flex items-center justify-center gap-2 ${buttonColor} ${createOrderMutation.isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
            {createOrderMutation.isPending ? (
                <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang xử lý...
                </>
            ) : (
                `Thanh toán ${totalPrice.toLocaleString('vi-VN')}đ`
            )}
        </button>
    );
}

export default Bill;
