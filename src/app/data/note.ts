import { v4 as uuidv4 } from 'uuid';

export interface Note {
  id: string;
  title: string;
  description: string;
  date: Date;
}

export function createNote(title: string, description: string): Note {
  return {
    id: uuidv4(),
    title,
    description,
    date: new Date()
  }
}
