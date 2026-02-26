export interface IOrder {
    id: string;
    userId: string;
    showtimeId: string;
    totalAmount: number;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    createdAt: string;
}

export interface OrderDto {
    showtimeId: string;
    seatIds: string[];
    totalAmount: number;
}
