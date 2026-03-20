import type { IMovie } from "./movie.types";
import type { IRoom } from "./room.types";

export interface IShowtime {
    id: string;
    movie_id: string;
    room_id: string;
    startTime: string;
    endTime?: string;
    price: string | number;
    status: string;
    movie: IMovie;
    room: IRoom;
    created_at: string;
}

export interface ShowtimeDto {
    movie_id: string;
    room_id: string;
    startTime: string;
    endTime: string;
    price: number;
}
