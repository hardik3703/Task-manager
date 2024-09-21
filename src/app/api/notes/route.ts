import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect'; 
import Note from '@/models/Note';
import { getToken } from 'next-auth/jwt';

const secret = "4b2c8e7d8a3f5e0a2f6e8d4c5b7a9e6c0f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o"

export async function GET(request: NextRequest) {
    try {
        await dbConnect(); // Connect to the database

        // Get the token to access the user's ID
        const token = await getToken({ req: request, secret });

        if (!token || !token.sub) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        // Extract user ID from the token (sub is usually the user ID in JWT tokens)
        const userId = token.sub;

        // Retrieve notes for the specific user
        const notes = await Note.find({ user: userId }).sort({ dueDate: 1 });

        if (!notes || notes.length === 0) {
            return NextResponse.json({ message: 'No notes found for this user' }, { status: 404 });
        }

        return NextResponse.json({ notes }, { status: 200 });
    } catch (error) {
        console.error('Error retrieving notes:', error);
        return NextResponse.json({ error: 'Error retrieving notes' }, { status: 500 });
    }
}
