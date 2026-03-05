import React, { useEffect, useState } from "react";
import ShowMessage from "./ShowMessage";

function ExpiredTime({ arrayGhe }: { arrayGhe: any[] }) {
    const [expiredTime, setExpiredTime] = useState(120);
    const [showMessage, setShowMessage] = useState(false);
    useEffect(() => {
        if (arrayGhe.length === 0) {
            setExpiredTime(120);
            setShowMessage(false);
            return;
        }

        if (expiredTime > 0) {
            const timerId = setTimeout(() => {
                setExpiredTime((prevTime) => prevTime - 1);
            }, 1000);

            if (expiredTime === 1 && !showMessage) {
                setShowMessage(true);
            }
            return () => clearTimeout(timerId);
        }
    }, [expiredTime, arrayGhe.length, showMessage]);

    return (
        <div>
            <p className="text-gray-300 text-sm">Thời Gian Giữ ghế</p>
            <p className="text-red-400 font-semibold text-4xl text-center">
                {expiredTime}
            </p>
            {showMessage ? (
                <>
                    <ShowMessage />
                </>
            ) : (
                <></>
            )}
        </div>
    );
}

export default ExpiredTime;
