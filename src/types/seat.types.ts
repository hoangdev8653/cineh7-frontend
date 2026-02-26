export interface ISeat {
    id: string;
    roomId: string;
    row: string;
    column: number;
    type: 'STANDARD' | 'VIP' | 'COUPLE';
    status: 'AVAILABLE' | 'BOOKED' | 'MAINTENANCE';
}

export interface SeatDto {
    roomId: string;
    row: string;
    column: number;
    type: 'STANDARD' | 'VIP' | 'COUPLE';
    status: 'AVAILABLE' | 'BOOKED' | 'MAINTENANCE';
}
