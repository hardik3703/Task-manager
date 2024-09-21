import { Button } from '@/components/ui/button';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface NoteCardProps {
  note: {
    title: string;
    description: string;
    dueDate: string;
  };

  onDelete: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note,  onDelete }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 transition-transform transform hover:scale-105">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
        <div className="flex space-x-2">

          <Button variant="destructive" onClick={onDelete}>
            <FaTrash />
          </Button>
        </div>


      </div>
      <p className="text-gray-700 mt-2">{note.description}</p>
      <p className='bg-yellow-400 text-black w-max px-2 rounded-md'>{new Date(note.dueDate).toLocaleDateString()}</p>
    </div>
  );
};

export default NoteCard;
