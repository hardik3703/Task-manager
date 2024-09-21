'use client';

import React, { useState } from 'react';
import { INote } from '../models/Note'; // Adjust the import path as necessary
import { Button } from '@/components/ui/button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const statusOrder = {
    ToDo: 1,
    InProgress: 2,
    Done: 3,
};

const priorityOrder = {
    Low: 1,
    Medium: 2,
    High: 3,
};

interface ShowNotesProps {
    notes: INote[];
    setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
}

const ShowList: React.FC<ShowNotesProps> = ({ notes, setNotes }) => {
    const [sortOption, setSortOption] = useState<'title' | 'status' | 'priority' | 'dueDate'>('title');

    const [updatedNote, setUpdatedNote] = useState<INote | null>(null);

    const onDelete = async (id: string) => {
        try {
            await axios.delete(`/api/delete/${id}`);
            setNotes((prevNotes) => prevNotes.filter(note => note._id.toString() !== id));
        } catch (error) {
            console.error("Failed to delete the note:", error);
        }
    };



    // const handleUpdate = async () => {
    //     if (updatedNote) {
    //         try {
    //             const response = await axios.put(`/api/update/${updatedNote._id}`, updatedNote);
    //             setNotes((prevNotes) => prevNotes.map(note => (note._id === updatedNote._id ? response.data : note)));
    //             setEditingNote(null);
    //         } catch (error) {
    //             console.error("Failed to update the note:", error);
    //         }
    //     }
    // };

    const sortedNotes = [...notes].sort((a, b) => {
        switch (sortOption) {
            case 'title':
                return a.title.localeCompare(b.title);
            case 'status':
                return statusOrder[a.status] - statusOrder[b.status];
            case 'priority':
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            case 'dueDate':
                return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            default:
                return 0;
        }
    });

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Notes</h2>
            
                <>
                    <div className="mb-4">
                        <label className="mr-2">Sort by:</label>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value as 'title' | 'status' | 'priority' | 'dueDate')}
                            className="border rounded-md p-2"
                        >
                            <option value="title">Title</option>
                            <option value="status">Status</option>
                            <option value="priority">Priority</option>
                            <option value="dueDate">Due Date</option>
                        </select>
                    </div>

                    {sortedNotes.length === 0 ? (
                        <p>No notes available.</p>
                    ) : (
                        <ul>
                            {sortedNotes.map((note) => (
                                <li key={note._id.toString()}>
                                    <div className="bg-white border mb-3 border-gray-300 rounded-lg shadow-sm p-4 transition-transform transform hover:scale-105">
                                        <div className="flex justify-between">
                                            <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
                                            <div className="flex space-x-2">
                                               
                                                <Button variant="destructive" onClick={() => onDelete(note._id.toString())}>
                                                    <FaTrash />
                                                </Button>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mt-2">{note.description}</p>
                                        <div className="mt-2 flex space-x-3">
                                            <span className={`inline-block px-2 py-1 text-white text-sm font-semibold rounded ${note.status === 'Done' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                                {note.status}
                                            </span>
                                            <span className={`inline-block px-2 py-1 text-white text-sm font-semibold rounded ${note.priority === 'High' ? 'bg-red-500' : note.priority === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'}`}>
                                                {note.priority.toString()}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mt-2">Due Date: {new Date(note.dueDate).toLocaleDateString()}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            
        </div>
    );
}

export default ShowList;
