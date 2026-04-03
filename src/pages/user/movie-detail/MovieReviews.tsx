import { useState } from "react";
import { Star, MessageSquare, ThumbsUp, CheckCircle } from "lucide-react";
import { useReviewQuery } from "../../../hooks/useReview"
import { formatDateTime } from "../../../utils/date";
import { useAuthStore } from "../../../store/useAuthStore";
import { toast } from "react-toastify";
import ReviewFormModal from "./ReviewFormModal";

const MovieReviews = ({ movieId, movieTitle }: { movieId: string; movieTitle: string }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const { user } = useAuthStore();
  const { getReviewByMovieQuery } = useReviewQuery();
  const { data: reviewResponse, isLoading } = getReviewByMovieQuery(movieId);

  const rawReviews = (reviewResponse as any)?.data?.data || [];
  const totalReviews = (reviewResponse as any)?.data?.total || 0;

  const avgRatingRaw = rawReviews.length > 0
    ? rawReviews.reduce((acc: number, r: any) => acc + (r.rating || 0), 0) / rawReviews.length
    : 0;
  const avgRating = (avgRatingRaw / 2).toFixed(1);

  const distribution = [5, 4, 3, 2, 1].map(star => {
    const count = rawReviews.filter((r: any) => Math.round(r.rating / 2) === star).length;
    const percentage = rawReviews.length > 0 ? Math.round((count / rawReviews.length) * 100) : 0;
    return { star, percentage };
  });

  const handleOpenReviewModal = () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để viết đánh giá!");
      return;
    }
    setIsReviewModalOpen(true);
  };

  if (isLoading) {
    return (
      <section className="mt-32 animate-pulse">
        <div className="h-10 w-64 bg-slate-100 rounded-full mb-12"></div>
        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 h-64 mb-12"></div>
        <div className="space-y-8">
          {[1, 2].map(i => (
            <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 h-48"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-32">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-5">
          <div className="w-2.5 h-10 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
          <h2 className="text-4xl font-black italic tracking-tighter uppercase text-slate-900">
            Đánh giá từ cộng đồng
          </h2>
        </div>
        <button
          onClick={handleOpenReviewModal}
          className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl hover:shadow-red-500/20 active:scale-95 cursor-pointer"
        >
          Viết đánh giá
        </button>
      </div>

      <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/40 mb-12 flex flex-col md:flex-row items-center gap-12">
        <div className="text-center md:border-r border-slate-100 md:pr-12">
          <p className="text-7xl font-black text-slate-900 italic tracking-tighter mb-2">{avgRating}</p>
          <div className="flex items-center justify-center gap-1 text-yellow-400 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} fill={s <= Math.round(Number(avgRating)) ? "currentColor" : "none"} size={20} className={s <= Math.round(Number(avgRating)) ? "" : "text-slate-200"} />
            ))}
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Dựa trên {totalReviews} đánh giá</p>
        </div>

        <div className="flex-grow space-y-3 w-full">
          {distribution.map(({ star, percentage }) => (
            <div key={star} className="flex items-center gap-4">
              <span className="text-xs font-black text-slate-400 w-4">{star}</span>
              <div className="flex-grow h-2 bg-slate-50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 rounded-full transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-xs font-bold text-slate-900 w-12 text-right">
                {percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {rawReviews.length > 0 ? (
          rawReviews.map((r: any) => {
            const normalizedRating = Math.round(r.rating / 2);
            const dateObj = formatDateTime(r.created_at);

            return (
              <div key={r.id} className="group relative bg-white rounded-[2.5rem] p-8 border border-slate-100 hover:border-red-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="shrink-0 flex md:flex-col items-center gap-4 md:w-32">
                    <div className="relative">
                      <img
                        src={r.user?.avarta || `https://i.pravatar.cc/150?u=${r.user?.id || r.id}`}
                        alt={r.user?.name}
                        className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center border-2 border-white">
                        <CheckCircle size={12} fill="currentColor" />
                      </div>
                    </div>
                    <div className="md:text-center">
                      <p className="font-black text-slate-900 text-sm uppercase leading-tight mb-1">{r.user?.name || "Ẩn danh"}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{dateObj.date}</p>
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center gap-1 text-yellow-400 mb-4">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} fill={s <= normalizedRating ? "currentColor" : "none"} size={14} className={s <= normalizedRating ? "" : "text-slate-200"} />
                      ))}
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed mb-6">
                      {r.comment}
                    </p>
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-600 transition-colors">
                        <ThumbsUp size={14} /> Hữu ích (0)
                      </button>
                      <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                        <MessageSquare size={14} /> Phản hồi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <MessageSquare size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-black uppercase tracking-widest">Chưa có đánh giá nào cho phim này</p>
          </div>
        )}
      </div>

      {totalReviews > rawReviews.length && (
        <button className="w-full mt-12 py-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-100 hover:border-slate-300 transition-all">
          Xem thêm {totalReviews - rawReviews.length} đánh giá khác
        </button>
      )}

      <ReviewFormModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        movieId={movieId}
        movieTitle={movieTitle}
      />
    </section>
  );
};

export default MovieReviews;
