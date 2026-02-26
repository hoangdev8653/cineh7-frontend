export interface IShowtime {
    id: string;
    movieId: string;
    roomId: string;
    startTime: string;
    endTime: string;
    price: number;
}

export interface ShowtimeDto {
    movieId: string;
    roomId: string;
    startTime: string;
    endTime: string;
    price: number;
}
