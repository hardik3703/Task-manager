import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/dbConnect'; // Ensure you have a db connection function
import Note from '@/models/Note'; // Import the Note model
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET || "4b2c8e7d8a3f5e0a2f6e8d4c5b7a9e6c0f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o"; 

export async function PUT(request: NextRequest, { params }: { params: { noteid: string } }) {
  try {
    await db(); // Make sure to connect to the database
    const token = await getToken({ req: request, secret });
    
    // Check if user is authenticated
    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const { noteid } = params;
    const { status } = await request.json();
    console.log(noteid);

    // Find the note by ID
    const note = await Note.findById(noteid).populate('user'); // Assuming 'user' is populated from Note model
    console.log(note);
    // Check if the note exists
    if (!note) {
      return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    }

    // Check if the authenticated user owns the note
    if (note.user._id.toString() !== token._id?.toString()) { // Convert to string for comparison
      return NextResponse.json({ message: 'Unauthorized to update this note' }, { status: 403 });
    }

    // Update the note's status
    note.status = status;
    console.log("note saved")
    await note.save(); // Save the updated note

    return NextResponse.json(note);
  } catch (error) {
    console.error('Error updating note status:', error);
    return NextResponse.json({ message: 'Failed to update note status' }, { status: 500 });
  }
}
