export interface IRoom {
    id: string;
    theaterId: string;
    name: string;
    type: '2D' | '3D' | 'IMAX' | '4DX';
    totalSeats: number;
}

export interface RoomDto {
    theaterId: string;
    name: string;
    type: '2D' | '3D' | 'IMAX' | '4DX';
    totalSeats: number;
}
