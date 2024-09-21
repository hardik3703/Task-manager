import { z } from 'zod';


const StatusEnum = z.enum(['ToDo', 'InProgress', 'Done']);
const PriorityEnum = z.enum(['Low', 'Medium', 'High']);

export const NoteSchema = z.object({
  title: z.string().max(50, { message: "Title should not be greater than 50 characters" }),
  description: z.string().max(500, { message: "Description should not be greater than 500 characters" }),
  status: StatusEnum,
  priority: PriorityEnum, 
  dueDate: z.date().optional() 
});
