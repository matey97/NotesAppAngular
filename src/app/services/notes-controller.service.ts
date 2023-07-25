import { Inject, Injectable } from '@angular/core';
import { NOTES_REPOSITORY, NotesRepository } from "../data/notes-repository";
import { Observable } from "rxjs";
import { createNote, Note } from "../data/note";
import { EmptyTitleError } from "../errors/empty-title";

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
}
