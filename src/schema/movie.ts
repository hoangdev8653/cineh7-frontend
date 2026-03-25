import * as z from 'zod';

export const movieSchema = z.object({
    title: z.string().min(1, 'Tên phim không được để trống'),
    slug: z.string().min(1, 'Slug không được để trống'),
    trailer: z.any().optional(),
    description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự'),
    releaseDate: z.string().min(1, 'Ngày phát hành không được để trống'),
    rating: z.coerce.number().min(0, 'Đánh giá phải ≥ 0'),
    duration: z.coerce.number().min(1, 'Thời lượng phải lớn hơn 0'),
    poster: z.any().optional(),
    comingSoon: z.boolean().default(false),
    isShowing: z.boolean().default(true),
});