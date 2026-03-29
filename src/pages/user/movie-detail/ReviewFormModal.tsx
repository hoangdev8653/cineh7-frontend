import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ModalCustom from '../../../components/common/Modal';
import { useReviewQuery } from '../../../hooks/useReview';
import { toast } from 'react-toastify';

interface ReviewFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    movieId: string;
    movieTitle: string;
}

const ReviewFormModal: React.FC<ReviewFormModalProps> = ({
    isOpen,
    onClose,
    movieId,
    movieTitle
}) => {
    const [rating, setRating] = useState(5);
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);
    const [comment, setComment] = useState('');
    const { createReviewMutation } = useReviewQuery();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!comment.trim()) {
            toast.error("Vui lòng nhập nội dung đánh giá!");
            return;
        }

        createReviewMutation.mutate({
            movie_id: movieId,
            rating: rating * 2,
            comment: comment.trim()
        }, {
            onSuccess: () => {
                toast.success("Đánh giá đã được gửi thành công!");
                setComment('');
                setRating(5);
                onClose();
            },
            onError: (error: any) => {
                toast.error(error?.message || "Gửi đánh giá thất bại. Vui lòng thử lại!");
            }
        });
    };

    if (!isOpen) return null;

    const ratingLabels: { [key: number]: string } = {
        1: "Rất tệ",
        2: "Không hay",
        3: "Bình thường",
        4: "Rất hay",
        5: "Tuyệt vời"
    };

    return (
        <ModalCustom
            onClose={onClose}
            className="w-full max-w-xl !bg-white !text-slate-900 border-none rounded-[3rem] p-0 shadow-2xl overflow-hidden"
        >
            <div className="relative p-8 md:p-10 max-h-[85vh] overflow-y-auto mt-8">
                <div className="text-center mb-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl mb-4"
                    >
                        <Star size={32} fill="currentColor" />
                    </motion.div>
                    <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-1 text-slate-900">Cảm nhận của bạn</h2>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">{movieTitle}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Rating Selector */}
                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 block text-center mb-4">Xếp hạng của bạn</label>
                        <div className="flex justify-center gap-3 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <motion.button
                                    key={star}
                                    type="button"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(null)}
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none"
                                >
                                    <Star
                                        size={36}
                                        fill={(hoveredRating || rating) >= star ? "#FBBF24" : "none"}
                                        className={(hoveredRating || rating) >= star ? "text-amber-400" : "text-slate-200"}
                                        strokeWidth={2.5}
                                    />
                                </motion.button>
                            ))}
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={hoveredRating || rating}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]"
                            >
                                {ratingLabels[hoveredRating || rating]}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* Comment Area */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between px-2">
                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Nội dung đánh giá</label>
                        </div>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-5 focus:bg-white focus:border-red-600/10 outline-none transition-all font-medium text-slate-600 text-sm min-h-[100px] max-h-[150px] resize-none"
                            placeholder="Chia sẻ trải nghiệm của bạn..."
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 bg-slate-50 text-slate-400 hover:text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] transition-all rounded-xl"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            disabled={createReviewMutation.isPending}
                            className="flex-[1.5] bg-slate-900 hover:bg-red-600 text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] transition-all shadow-lg text-[10px] flex items-center justify-center gap-3"
                        >
                            {createReviewMutation.isPending ? (
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <Send size={14} strokeWidth={3} className="-rotate-12" />
                            )}
                            Gửi đánh giá
                        </button>
                    </div>
                </form>
            </div>
        </ModalCustom>
    );
};

export default ReviewFormModal;
