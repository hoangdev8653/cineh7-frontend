import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface BillProps {
    totalPrice: number;
    arrayGhe: number[];
    id: string;
}

function Bill({ totalPrice, arrayGhe, id }: BillProps) {
    const navigate = useNavigate();

    async function createOrder(data: any, actions: any) {
        console.log(`Creating order for ${id} with ${arrayGhe.length} seats.`);
        return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
                {
                    description: "Thanh toán vé xem phim CineH7",
                    amount: {
                        value: (totalPrice / 25000).toFixed(2), // Convert VND to USD roughly for sandbox testing
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

    return (
        <PayPalScriptProvider options={{ "clientId": "test" }}>
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </PayPalScriptProvider>
    );
}

export default Bill;
