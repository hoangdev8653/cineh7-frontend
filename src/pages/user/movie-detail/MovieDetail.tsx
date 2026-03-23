import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Play,
  Calendar,
  Clock,
  Star,
  Heart,
  Share2,
  Ticket,
  ChevronRight,
} from "lucide-react";
import { useMovieDetail } from "../../../hooks/useMovie";
import type { IMovie } from "../../../types/movie.types";
import VideoModal from "../../../components/features/videoModal/VideoModal";
import { useShowtimeByMovieId } from "../../../hooks/useShowTime";

function MovieDetail() {
  const { id } = useParams();
  const { data: movie, isLoading } = useMovieDetail(id || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: showtime } = useShowtimeByMovieId(id || "");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);


  useEffect(() => {
    if (showtime && showtime.length > 0 && !selectedDate) {
      setSelectedDate(showtime[0].date);
    }
  }, [showtime, selectedDate]);

  console.log(movie);


  const currentDayGroup = showtime?.find(
    (item: any) => item.date === selectedDate,
  );
  const showtimesInSelectedDate = currentDayGroup?.showtimes || [];

  const groupedData = showtimesInSelectedDate.reduce(
    (acc: any, showtime: any) => {
      const room = showtime.room || {
        id: "default",
        name: "Phòng Tiêu Chuẩn",
        type: "2D",
      };
      const roomId = room.id;

      if (!acc[roomId]) {
        acc[roomId] = {
          info: room,
          showtimes: [],
        };
      }
      acc[roomId].showtimes.push(showtime);
      return acc;
    },
    {},
  );

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm animate-pulse">
            Loading Magic...
          </p>
        </div>
      </div>
    );

  if (!movie)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase italic tracking-tighter">
            Movie not found
          </h2>
          <a
            href="/"
            className="text-red-600 font-bold uppercase tracking-widest text-sm hover:underline"
          >
            Back to Home
          </a>
        </div>
      </div>
    );

  return (
    <div className="bg-slate-50 min-h-screen pb-32 font-sans text-slate-800 selection:bg-red-600 selection:text-white">
      {/* Hero Section */}
      <div className="relative h-[65vh] md:h-[85vh] w-full overflow-hidden bg-slate-900">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover scale-110 blur-xl opacity-30 transform transition-transform duration-[20s] hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-transparent hidden md:block" />

        <div className="absolute inset-0 flex items-end md:items-center pb-12 md:pb-0">
          <div className="container mx-auto px-4 md:px-12 lg:px-24 flex flex-col md:flex-row gap-12 items-center md:items-start">
            {/* Poster Card */}
            <div className="relative group w-48 md:w-80 aspect-[2/3] shrink-0 hidden md:block">
              <div className="absolute -inset-4 bg-red-600/20 blur-2xl rounded-[2.5rem] group-hover:bg-red-600/30 transition-all duration-500" />
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden border-4 border-white/10 shadow-2xl backdrop-blur-sm z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center duration-500">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white shadow-[0_0_50px_rgba(220,38,38,0.5)] hover:scale-110 active:scale-95 transition-all"
                  >
                    <Play fill="currentColor" size={32} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Movie Content */}
            <div className="flex-grow text-center md:text-left z-10">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-8">
                <span className="px-5 py-2 bg-white/10 backdrop-blur-xl rounded-full text-[12px] font-black tracking-[0.2em] uppercase text-white border border-white/20">
                  {movie.metadata?.genre || "GENRE"}
                </span>
                {movie.comingSoon && (
                  <span className="px-5 py-2 bg-yellow-500 rounded-full text-[12px] font-black tracking-[0.2em] uppercase text-slate-900 shadow-xl shadow-yellow-500/30">
                    COMING SOON
                  </span>
                )}
                {movie.isShowing && !movie.comingSoon && (
                  <span className="px-5 py-2 bg-red-600 rounded-full text-[12px] font-black tracking-[0.2em] uppercase text-white shadow-xl shadow-red-600/30">
                    NOW SHOWING
                  </span>
                )}
              </div>

              <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter text-white mb-8 uppercase leading-[0.9] drop-shadow-2xl">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-12 mb-12">
                <div className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-400 flex items-center justify-center shadow-xl shadow-yellow-500/20 group-hover:rotate-12 transition-transform">
                    <Star
                      fill="currentColor"
                      className="text-slate-900"
                      size={24}
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1 leading-none">
                      Rating
                    </p>
                    <p className="text-2xl font-black text-white leading-none">
                      {movie.rating}/10
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center shadow-xl shadow-red-600/20 text-white group-hover:-rotate-12 transition-transform">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1 leading-none">
                      Duration
                    </p>
                    <p className="text-2xl font-black text-white leading-none">
                      {movie.duration} Phút
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center shadow-xl shadow-white/10 text-slate-900 group-hover:rotate-12 transition-transform">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1 leading-none">
                      Released
                    </p>
                    <p className="text-2xl font-black text-white leading-none">
                      {new Date(movie.releaseDate).getFullYear()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <button className="px-12 py-6 bg-red-600 text-white rounded-[1.5rem] font-black italic tracking-[0.2em] uppercase hover:bg-red-700 hover:shadow-[0_20px_50px_rgba(220,38,38,0.4)] transition-all active:scale-95 flex items-center gap-4 text-lg">
                  <Ticket size={28} className="-rotate-12" /> Buy Tickets
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-12 py-6 bg-white/10 backdrop-blur-xl text-white border-2 border-white/20 rounded-[1.5rem] font-black italic tracking-[0.2em] uppercase hover:bg-white/20 transition-all flex items-center gap-4 text-lg"
                >
                  <Play size={24} fill="currentColor" /> Trailer
                </button>
                <div className="flex gap-4 ml-0 md:ml-4 mt-6 md:mt-0">
                  <button className="w-16 h-16 border-2 border-white/20 text-white rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors">
                    <Heart size={24} />
                  </button>
                  <button className="w-16 h-16 border-2 border-white/20 text-white rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors">
                    <Share2 size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="container mx-auto px-4 md:px-12 lg:px-24 mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-24">
            {/* Synopsis */}
            <section className="relative">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-2.5 h-10 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                <h2 className="text-4xl font-black italic tracking-tighter uppercase text-slate-900">
                  Synopsis
                </h2>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-amber-600 rounded-3xl blur opacity-5 group-hover:opacity-10 transition duration-500" />
                <div className="relative bg-white rounded-3xl p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                  <p className="text-xl text-slate-600 leading-relaxed font-medium first-letter:text-5xl first-letter:font-black first-letter:text-red-600 first-letter:mr-3 first-letter:float-left">
                    {movie.description}
                  </p>
                </div>
              </div>
            </section>

            {/* Showtimes */}
            <section>
              <div className="flex items-center gap-5 mb-10">
                <div className="w-2.5 h-10 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                <h2 className="text-4xl font-black italic tracking-tighter uppercase text-slate-900">
                  Showtimes
                </h2>
              </div>

              <div className="flex overflow-x-auto pb-6 scrollbar-hide gap-4 mb-12">
                {showtime?.length > 0 &&
                  showtime?.map((item: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(item.date)}
                      className={`min-w-[120px] px-8 py-5 rounded-[2rem] font-black transition-all duration-300 ${selectedDate === item.date
                        ? "bg-red-600 text-white shadow-2xl shadow-red-600/40 scale-105"
                        : "bg-white border-2 border-slate-100 text-slate-400 hover:border-red-600/30 hover:text-red-600 shadow-sm"
                        }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] uppercase tracking-widest opacity-60">
                          {new Date(item.date).toLocaleDateString("vi-VN", {
                            weekday: "short",
                          })}
                        </span>
                        <span className="text-xl tracking-tighter italic">
                          {new Date(item.date).toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                          })}
                        </span>
                      </div>
                    </button>
                  ))}
              </div>

              <div className="grid gap-8">
                {Object.values(groupedData).map((group: any) => (
                  <div
                    key={group.info.id}
                    className="group/theater relative overflow-hidden bg-white rounded-[3rem] p-10 border border-slate-100 hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-700"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full translate-x-32 -translate-y-32 group-hover/theater:bg-red-50/50 transition-colors duration-700" />

                    <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-3xl font-black text-slate-900 group-hover/theater:text-red-600 transition-colors uppercase italic tracking-tighter">
                            {group.info?.name || "Phòng chiếu"}
                          </h3>
                          <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase text-slate-500">
                            {group.info?.type || "2D"}
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-400">
                          <span className="mt-1">📍</span>
                          <p className="font-bold text-sm leading-tight">
                            CineH7 Cinema
                          </p>
                        </div>
                      </div>
                      <button className="shrink-0 px-6 py-3 bg-slate-50 rounded-2xl text-red-600 font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-1">
                        Map Connection <ChevronRight size={16} />
                      </button>
                    </div>

                    <div className="relative flex flex-wrap gap-4">
                      {group.showtimes.map((item: any, idx: number) => {
                        console.log(item);

                        const time = new Date(item.startTime);
                        const hours = time.getHours();
                        const minutes = time
                          .getMinutes()
                          .toString()
                          .padStart(2, "0");

                        let suffix = "AM";
                        if (hours >= 12) suffix = "PM";

                        const timeDisplay = `${hours % 12 || 12}:${minutes}`;
                        return (
                          <Link
                            key={idx}
                            to={`/lich-chieu/${item.room.id}?showtimeId=${item.id || item._id}`}
                            className="group/time flex flex-col items-center min-w-[120px] p-6 bg-slate-50 border-2 border-transparent rounded-[2rem] hover:bg-red-600 hover:shadow-2xl hover:shadow-red-600/30 transition-all duration-300"
                          >
                            <span className="text-2xl font-black text-slate-900 group-hover/time:text-white tracking-tighter italic">
                              {timeDisplay}
                              <span className="text-xs ml-1 uppercase opacity-40 group-hover/time:opacity-70">
                                {suffix}
                              </span>
                            </span>
                            <div className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover/time:text-white/60">
                              {item.price
                                ? `${parseInt(item.price).toLocaleString("vi-VN")}đ`
                                : "GIÁ VÉ"}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {Object.keys(groupedData).length === 0 && !isLoading && (
                  <div className="text-center py-24 bg-white rounded-[4rem] shadow-sm border-2 border-dashed border-slate-100">
                    <div className="inline-flex w-20 h-20 items-center justify-center rounded-full bg-slate-50 mb-6">
                      <Ticket size={32} className="text-slate-200 rotate-12" />
                    </div>
                    <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-sm">
                      Waiting for schedules...
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Details */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit pb-12">
            <div className="relative group p-1">
              <div className="absolute -inset-1 bg-gradient-to-b from-slate-900 to-slate-800 rounded-[3.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition duration-500" />
              <div className="relative bg-slate-900 rounded-[3rem] p-12 text-white overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-x-10 -translate-y-20 blur-3xl" />

                <h3 className="text-3xl font-black italic mb-12 border-b-4 border-red-600 inline-block pb-2 tracking-tighter uppercase">
                  Movie Intel
                </h3>

                <div className="space-y-10">
                  <div className="group/intel">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-2">
                      Cast Ensemble
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {movie.metadata?.actors?.map((actor: string, i: number) => (
                        <span
                          key={i}
                          className="text-lg font-bold group-hover:text-red-400 transition-colors"
                        >
                          {actor}
                          {i < (movie.metadata?.actors?.length || 0) - 1
                            ? " • "
                            : ""}
                        </span>
                      )) || <span className="text-lg font-bold">N/A</span>}
                    </div>
                  </div>

                  <div className="group/intel">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-2">
                      Duration
                    </p>
                    <p className="text-xl font-bold group-hover:text-red-400 transition-colors">
                      {movie.duration} Phút
                    </p>
                  </div>

                  <div className="group/intel">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-2">
                      Premiere Date
                    </p>
                    <p className="text-xl font-bold group-hover:text-red-400 transition-colors">
                      {new Date(movie.releaseDate).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="group/intel">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-2">
                      Language
                    </p>
                    <p className="text-xl font-bold uppercase italic group-hover:text-red-400 transition-colors">
                      {movie.metadata?.language || "Tiếng Việt"}
                    </p>
                  </div>
                </div>

                <VideoModal
                  isOpen={isModalOpen}
                  close={() => setIsModalOpen(false)}
                  videoUrl={movie.trailer}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
