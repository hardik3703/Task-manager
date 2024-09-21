import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface AddNotePageProps {
  setNotes: React.Dispatch<React.SetStateAction<any[]>>;
  setShowAddNote: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddNotePage: React.FC<AddNotePageProps> = ({ setNotes,  setShowAddNote }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(" ");
  const [status, setStatus] = useState('ToDo');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(priority);
    e.preventDefault();
    
    try {

      const response = await axios.post('/api/addNote', {
        title,
        description,
        status,
        priority,
        dueDate
      });
     
      console.log(response)

      // Fix setNotes usage
      setNotes((prev) => [...prev, response.data]);
      setMessage('Note added successfully!');
      setError(null);
      setTitle('');
      setDescription('');
      setStatus('ToDo');
      setPriority('Low');
      setDueDate('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add note');
      setMessage(null);
    }
  };

  const handelClose = () =>{
    setShowAddNote((prev) => prev = false);
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">

      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg relative border border-gray-200">
      <button onClick={handelClose} className="absolute right-6 top-3 text-2xl text-black font-bold hover:text-red-500 focus:outline-none">
  &times;
</button>

        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Add New Note</h1>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
       
        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div>
        
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter note description"
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={setStatus} value={status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ToDo">ToDo</SelectItem>
                <SelectItem value="InProgress">In Progress</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select onValueChange={setPriority} value={priority}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Add Note</Button>
        </form>
      </div>
    </div>
  );
};

export default AddNotePage;
