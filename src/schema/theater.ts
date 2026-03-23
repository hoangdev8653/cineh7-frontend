import * as z from 'zod';

export const theaterSchema = z.object({
    name: z.string().min(1, 'Tên rạp không được để trống'),
    address: z.string().min(1, 'Địa chỉ không được để trống'),
    location: z.string().min(1, 'Khu vực không được để trống'),
    system_id: z.string().min(1, 'Hệ thống rạp không được để trống'),
    logo: z.string().optional().or(z.literal('')),
});