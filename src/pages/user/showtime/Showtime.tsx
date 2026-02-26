import MovieCard from "../home/MovieCard"
import { useMovies } from "../../../hooks/useMovie"

function Showtime() {
    const { data: movies } = useMovies()

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto py-10 px-4 md:px-32">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Phim đang chiếu</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies?.map((movie: any) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Showtime
