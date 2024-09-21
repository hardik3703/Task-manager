import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { name, email, password } = await request.json();

        // Check if email is already taken
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Email is already in use',
                }),
                { status: 400 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Registration successful',
            }),
            { status: 201 }
        );
    } catch (error) {
        console.error('Error during registration:', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: 'An error occurred during registration',
            }),
            { status: 500 }
        );
    }
}
