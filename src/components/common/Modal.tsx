import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Overlay from "./Overlay";

function ModalCustom({ onClose, children, className }: { onClose: () => void, children: React.ReactNode, className?: string }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto ">
            <div
                className={`relative py-4 rounded shadow-lg z-50 bg-white ${className} `}
            >
                <div
                    onClick={onClose}
                    className="absolute top-2 right-2 cursor-pointer hover:opacity-70 z-50"
                >
                    <IoMdClose className="text-2xl" />
                </div>
                {children}
            </div>
            <div
                onClick={onClose}
                className="fixed inset-0 bg-opacity-50 z-40"
            >
                <Overlay />
            </div>
        </div>
    );
}

export default ModalCustom;
