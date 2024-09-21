'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import AddNoteButton from '@/components/AddNote';
import NoteCard from '@/components/NoteCard'; 
import ConfirmationDialog from '../../components/ConfirmationDialog'; 
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ShowList from "@/components/ShowList";
import toast, { Toaster} from 'react-hot-toast';

const DashboardPage = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddNote, setShowAddNote] = useState<boolean>(false);
  const [isList, setIsList] = useState<boolean>(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('/api/notes');
        setNotes(response.data.notes);
      } catch (err: any) {
        toast.error("No Notes Found")
        setError('No notes Found');
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/delete/${id}`);
      setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
      setConfirmDeleteId(null);
    } catch (err: any) {
      setError('Failed to delete note');
    }
  };

  const confirmDelete = (id: string) => {
    setConfirmDeleteId(id);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, noteId: string) => {
    e.dataTransfer.setData('noteId', noteId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, newStatus: string) => {
    e.preventDefault(); // Prevent default behavior
    const noteId = e.dataTransfer.getData('noteId');
    const noteToUpdate = notes.find(note => note._id === noteId);

    if (noteToUpdate && noteToUpdate.status[0] !== newStatus) {
      const updatedNote = { ...noteToUpdate, status: [newStatus] };
      try {
        await axios.put(`/api/notes/${noteId}`, { status: [newStatus] });
        setNotes(prevNotes => prevNotes.map(note => note._id === noteId ? updatedNote : note));
      } catch (err: any) {
        setError('Failed to update note status');
      }
    }
  };

  const categorizeNotes = () => {
    const toDo = notes.filter(note => note.status[0] === 'ToDo');
    const inProgress = notes.filter(note => note.status[0] === 'InProgress');
    const completed = notes.filter(note => note.status[0] === 'Done');
    return { toDo, inProgress, completed };
  };

  const { toDo, inProgress, completed } = categorizeNotes();

  const NoNotesMessage = () => (
    <div className="text-center text-gray-500 font-semibold p-4">
      No notes available.
    </div>
  );

  return (
    <div className="w-screen h-max bg-gray-100 p-4">
      <Toaster/>
      <div className="w-full h-full p-8 border-2 border-black shadow-lg rounded-lg bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Drag and drop your tasks to manage them</p>

        <Separator className="my-6" />

        <div className="controls flex md:w-11/12 mb-4 m-auto w-screen justify-between px-6 mt-2">
          <button
            onClick={() => setIsList(true)}
            className={`${
              isList
                ? 'bg-green-500 text-white'
                : 'bg-slate-300 text-gray-700'
            } p-3 w-1/2 rounded-l-md transition-all border-r-2 border-r-black hover:bg-green-300 focus:outline-none focus:ring focus:border-grey-300`}
            type="button"
          >
            List View
          </button>
          <button
            onClick={() => setIsList(false)}
            className={`${
              !isList
                ? 'bg-green-500 text-white'
                : 'bg-slate-300 text-gray-700'
            } p-3 w-1/2 rounded-r-md border-l-2 border-l-black transition-all hover:bg-green-300 focus:outline-none focus:ring focus:border-blue-300`}
            type="button"
          >
            Kanban View
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {isList && <ShowList notes={notes} setNotes={setNotes}/>}

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          !isList && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-full">
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'ToDo')}
                className="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm overflow-y-auto"
                style={{ height: 'calc(100vh - 200px)' }}
              >
                <h2 className="text-xl font-semibold text-black bg-red-300 rounded-lg p-2">To Do</h2>
                {toDo.length === 0 ? <NoNotesMessage /> : toDo.map(note => (
                  <div key={note._id} className="my-2" draggable onDragStart={(e) => handleDragStart(e, note._id)}>
                    <NoteCard
                      note={note}
                      onDelete={() => confirmDelete(note._id)}
                    />
                  </div>
                ))}
              </div>

              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'InProgress')}
                className="p-4 bg-gray-50 border h-full border-gray-300 rounded-lg shadow-sm overflow-y-auto"
                style={{ height: 'calc(100vh - 200px)' }}
              >
                <h2 className="text-xl font-semibold text-black bg-yellow-300 rounded-lg p-2">In Progress</h2>
                {inProgress.length === 0 ? <NoNotesMessage /> : inProgress.map(note => (
                  <div key={note._id} className="my-2" draggable onDragStart={(e) => handleDragStart(e, note._id)}>
                    <NoteCard
                      note={note}
                      onDelete={() => confirmDelete(note._id)}
                    />
                  </div>
                ))}
              </div>

              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'Done')}
                className="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm overflow-y-auto"
                style={{ height: 'calc(100vh - 200px)' }}
              >
                <h2 className="text-xl font-semibold text-black bg-green-500 rounded-lg p-2">Completed</h2>
                {completed.length === 0 ? <NoNotesMessage /> : completed.map(note => (
                  <div key={note._id} className="my-2" draggable onDragStart={(e) => handleDragStart(e, note._id)}>
                    <NoteCard
                      note={note}
                      onDelete={() => confirmDelete(note._id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      <Button
        variant="outline"
        onClick={() => setShowAddNote(prev => !prev)}
        className="text-3xl z-50 rounded-full font-bold border-2 border-transparent bg-black absolute right-6 bottom-6 w-14 h-14 flex justify-center items-center text-white shadow-lg hover:bg-gray-800 fixed transition-transform duration-300 transform hover:scale-110"
      >
        +
      </Button>
      {showAddNote && <AddNoteButton setNotes={setNotes}  setShowAddNote={setShowAddNote} />}
      
      {confirmDeleteId && (
        <ConfirmationDialog 
          onConfirm={() => handleDelete(confirmDeleteId)} 
          onCancel={cancelDelete} 
        />
      )}
    </div>
  );
};

export default DashboardPage;
