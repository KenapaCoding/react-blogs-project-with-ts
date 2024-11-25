import {z} from 'zod'

export const blogSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    image: z.string().url('Image must be a valid URL'),
    createdAt: z.string().optional()
})