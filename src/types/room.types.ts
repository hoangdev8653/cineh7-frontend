import type { ITheater } from "./theater.types";

export interface IRoom {
    id: string;
    theaterId: string;
    name: string;
    type: '2D' | '3D' | 'IMAX' | '4DX';
    totalSeats: number;
    theater?: ITheater;
}

export interface RoomDto {
    theaterId: string;
    name: string;
    type: '2D' | '3D' | 'IMAX' | '4DX';
    totalSeats: number;
}

export interface BillProps {
    totalPrice: number;
    arrayGhe: string[];
    showtimeId: string;
    selectedMethod: string;
}