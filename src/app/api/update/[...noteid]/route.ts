import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/dbConnect'; // Ensure you have a db connection function
import Note from '@/models/Note'; // Import the Note model
import { getToken } from 'next-auth/jwt';

const secret = "4b2c8e7d8a3f5e0a2f6e8d4c5b7a9e6c0f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o"; 

export async function PUT(request: NextRequest, { params }: { params: { noteid: string } }) {
  try {
    await db(); // Connect to the database
    const token = await getToken({ req: request, secret });
    
    // Check if user is authenticated
    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const { noteid } = params;
    const { title, description, status, priority, dueDate } = await request.json();

    // Find the note by ID
    const note = await Note.findById(noteid).populate('user');
    
    // Check if the note exists
    if (!note) {
      return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    }

    // Check if the authenticated user owns the note
    if (note.user._id.toString() !== token._id?.toString()) {
      return NextResponse.json({ message: 'Unauthorized to update this note' }, { status: 403 });
    }

    // Update note fields
    if (title) note.title = title;
    if (description) note.description = description;
    if (status) note.status = status;
    if (priority) note.priority = priority;
    if (dueDate) note.dueDate = new Date(dueDate); // Convert to Date object

    await note.save(); // Save the updated note

    return NextResponse.json(note);
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json({ message: 'Failed to update note' }, { status: 500 });
  }
}
