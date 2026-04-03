import * as z from 'zod';

export const showtimeSchema = z.object({
    movieId: z.string().min(1, 'Vui lòng chọn phim'),
    roomId: z.string().min(1, 'Vui lòng chọn phòng'),
    startTime: z.string().min(1, 'Vui lòng chọn thời gian bắt đầu'),
    price: z.number().min(0, 'Giá vé phải lớn hơn hoặc bằng 0'),
});

export type ShowtimeFormData = z.infer<typeof showtimeSchema>;
