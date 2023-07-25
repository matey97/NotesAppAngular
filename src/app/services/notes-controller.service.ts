import { Inject, Injectable } from '@angular/core';
import { NOTES_REPOSITORY, NotesRepository } from "../data/notes-repository";
import { Observable } from "rxjs";
import { Note } from "../data/note";

@Injectable({
  providedIn: 'root'
})
export class NotesControllerService {

  constructor(
    @Inject(NOTES_REPOSITORY) private notesRepository: NotesRepository
  ) { }

  getNotes(): Observable<Array<Note>> {
    throw new Error("Unimplemented!");
  }

  async createNote(title: string, description: string): Promise<void> {
    throw new Error("Unimplemented!");
  }
}
