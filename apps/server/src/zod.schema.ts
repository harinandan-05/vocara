import {url, z} from 'zod';

export const userSchema  = z.object({
    id: z.string(),
    name: z.string().min(2,"name must be atleast 2 characters"),
    email: z.string().email("invalid email adress"),
    password: z.string().min(5,"password must be minimum 5 characters")
})

export const githubUrlSchema  = z.object({
    githubUrl:z.url().refine((url) => url.startsWith("https://github.com/"),{
        message:"must be a github url"
    })
})

export const linkedinSchema  = z.object({
    linkedinUrl:z.url().startsWith("https://")
})