import { NotesRepository } from "../notes-repository";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Note } from "../note";

@Injectable({
  providedIn: 'root'
})
export class LocalRepository implements NotesRepository {

  getNoteChanges(): Observable<Array<Note>> {
    throw new Error("Unimplemented!");
  }

  insert(note: Note): void {
    throw new Error("Unimplemented!");
  }
}
