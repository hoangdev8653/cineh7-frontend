import { motion } from "framer-motion";
import { Film, Home } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-4 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <motion.div
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        y: [0, 100, 0],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600 rounded-full blur-[100px]"
                />
            </div>

            <div className="z-10 flex flex-col items-center text-center max-w-2xl px-4">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                    className="bg-indigo-600/20 p-6 rounded-3xl mb-8 border border-indigo-500/30 backdrop-blur-sm"
                >
                    <Film size={84} className="text-indigo-400" />
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-8xl md:text-9xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer"
                >
                    404
                </motion.h1>

                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl md:text-3xl font-bold mt-4 text-slate-100"
                >
                    Cảnh quay này chưa được phát hành!
                </motion.h2>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-4 text-slate-400 text-lg md:text-xl leading-relaxed max-w-md"
                >
                    Oops! Có vẻ như bạn đã lạc đường trong rạp phim rồi. Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 group"
                >
                    <Link
                        to="/"
                        className="flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 active:scale-95"
                    >
                        <Home size={20} />
                        Quay lại trang chủ
                    </Link>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-shimmer {
          animation: shimmer 5s ease infinite;
        }
      `}} />
        </div>
    );
}

export default NotFound;