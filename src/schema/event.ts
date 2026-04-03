import { z } from "zod";

export const newsEventSchema = z.object({
    title: z.string().min(1, 'Tiêu đề không được để trống'),
    slug: z.string().min(1, 'Slug không được để trống'),
    content: z.string().min(10, 'Nội dung phải có ít nhất 10 ký tự'),
    thumbnail: z.any().optional(),
    type: z.enum(['NEWS', 'EVENT']),
});