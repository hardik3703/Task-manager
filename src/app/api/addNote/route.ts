import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/dbConnect'; // Your DB connection function
import Note from '@/models/Note'; // Import your Note model
import { getToken } from 'next-auth/jwt';

const secret = "4b2c8e7d8a3f5e0a2f6e8d4c5b7a9e6c0f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o";

export async function POST(request: NextRequest) {
  try {
    await db(); // Connect to the database

    const token = await getToken({ req: request, secret });

    // Check if user is authenticated
    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const { title, description, status, priority, dueDate } = await request.json();

    // Validate required fields
    if (!title || !description || !status) {
      return NextResponse.json({ message: 'Title, description, and status are required' }, { status: 400 });
    }

    // Create a new note
    const newNote = await Note.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: token.sub, // Set the user from the authenticated token
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error('Error adding note:', error);
    return NextResponse.json({ message: 'Failed to add note' }, { status: 500 });
  }
}
