import type { IMovie } from "./movie.types";
import type { IRoom } from "./room.types";
import type { ITheater } from "./theater.types";
import type { ShowtimeFormData } from "../schema/showtime";

export interface IShowtime {
    id: string;
    movieId: string;
    roomId: string;
    startTime: string;
    endTime?: string;
    price: string | number;
    status: string;
    movie: IMovie;
    room: IRoom;
    created_at: string;
}

export interface ShowtimeDto {
    movieId: string;
    roomId: string;
    startTime: string;
    price: number;
}


export interface ShowtimeDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export interface ShowtimeHeaderProps {
    onAdd: () => void;
}

export interface ShowtimeListProps {
    showtimes: IShowtime[];
    isLoading: boolean;
    onEdit: (showtime: IShowtime) => void;
    onDelete: (id: string) => void;
}

export interface ShowtimePaginationProps {
    totalShowtimes: number;
    page: number;
    limit: number;
    onPageChange: (page: number) => void;
}

export interface ShowtimeSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export interface ShowtimeFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingShowtime: IShowtime | null;
    onSubmit: (data: ShowtimeFormData) => void;
    movies: IMovie[];
    rooms: IRoom[];
    theaters: ITheater[];
    isPending: boolean;
}