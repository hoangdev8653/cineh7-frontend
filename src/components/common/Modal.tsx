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
                    className="absolute top-6 right-6 p-2 rounded-full cursor-pointer text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all z-50"
                >
                    <IoMdClose className="text-xl" />
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
