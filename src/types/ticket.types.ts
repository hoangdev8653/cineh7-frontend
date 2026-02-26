export interface ITicket {
    id: string;
    orderId: string;
    seatId: string;
    price: number;
}

export interface TicketDto {
    orderId: string;
    seatId: string;
    price: number;
}
