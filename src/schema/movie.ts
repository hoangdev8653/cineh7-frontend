import * as z from 'zod';

export const movieSchema = z.object({
    title: z.string().min(1, 'Tên phim không được để trống'),
    description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự'),
    release_date: z.string().min(1, 'Ngày phát hành không được để trống'),
    duration: z.coerce.number().min(1, 'Thời lượng phải lớn hơn 0'),
    genre: z.string().min(1, 'Thể loại không được để trống'),
    director: z.string().min(1, 'Đạo diễn không được để trống'),
    actors: z.string().min(1, 'Diễn viên không được để trống'),
    rating: z.string().min(1, 'Độ tuổi không được để trống'),
    language: z.string().min(1, 'Ngôn ngữ không được để trống'),
    image_url: z.string().url('URL poster không hợp lệ'),
    video_url: z.string().url('URL trailer không hợp lệ'),
});