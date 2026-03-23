"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("processing");

  useEffect(() => {
    // Lấy toàn bộ chuỗi query trên URL (ví dụ: ?vnp_Amount=...&vnp_BankCode=...)
    const queryString = searchParams.toString();

    // Gửi xuống Backend để verify chữ ký và cập nhật database
    axios
      .get(`http://localhost:3000/api/payment/vnpay-return?${queryString}`)
      .then((response) => {
        if (response.data.success) {
          setStatus("success");
        } else {
          setStatus("fail");
        }
      })
      .catch((error) => {
        console.error(error);
        setStatus("fail");
      });
  }, []);

  if (status === "processing")
    return <div>Đang xử lý kết quả thanh toán...</div>;
  if (status === "success") return <div>🎉 Thanh toán mua vé thành công!</div>;
  return <div>❌ Thanh toán thất bại hoặc giao dịch không hợp lệ.</div>;
};

export default Payment;
