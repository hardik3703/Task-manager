import {z} from 'zod';

export const nameValidation = z
        .string()
        .min(2, "Username must be atleast of 2 character")
        .max(20, "username must be lower than 20 character")
        .regex(/^[a-zA-Z]+$/ , "username must not contain special character");

export const signupSchema = z.object({
    name: nameValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "password must contain atleast 6 character"}).max(20, {message: "Password must be lesser than 15 character"})
})