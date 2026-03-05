export interface IOrder {
    id: string;
    userId: string;
    showtimeId: string;
    totalAmount: number;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    createdAt: string;
}

export interface OrderDto {
    showtime_id: string;
    seat_ids: string[];
}
