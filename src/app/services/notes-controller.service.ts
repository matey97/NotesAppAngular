import { Inject, Injectable } from '@angular/core';
import { NOTES_REPOSITORY, NotesRepository } from "../data/notes-repository";
import { firstValueFrom, Observable } from "rxjs";
import { createNote, Note } from "../data/note";
import { EmptyTitleError } from "../errors/empty-title";
import { NoteNotFoundError } from "../errors/not-found";

@Injectable({
  providedIn: 'root'
})
export class NotesControllerService {

  constructor(
    @Inject(NOTES_REPOSITORY) private notesRepository: NotesRepository
  ) { }

  getNotes(): Observable<Array<Note>> {
    return this.notesRepository.getNoteChanges();
  }

  async createNote(title: string, description: string): Promise<void> {
    if (title.length === 0) {
      throw new EmptyTitleError();
    }

    const note = createNote(title, description);
    this.notesRepository.insert(note);
  }

  async updateNote(id: string, title: string, description: string): Promise<void> {
    if (title.length === 0) {
      throw new EmptyTitleError();
    }

    const idExists = await this.idExists(id);
    if (!idExists) {
      throw new NoteNotFoundError(id);
    }

    this.notesRepository.update(id, title, description);
  }

  async deleteNote(id: string): Promise<void> {
    throw new Error("Unimplemented!");
  }

  private async idExists(id: string): Promise<boolean> {
    const notes = await firstValueFrom(this.getNotes());
    return notes.find((note) => note.id === id) !== undefined;
  }
}
