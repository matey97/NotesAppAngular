import { Observable } from "rxjs";
import { Note } from "./note";
import { InjectionToken } from "@angular/core";

export const NOTES_REPOSITORY = new InjectionToken<NotesRepository>('repository');

export interface NotesRepository {
  getNoteChanges(): Observable<Array<Note>>;
  insert(note: Note): void;
  update(id: string, title: string, description: string): void;
  clear(): void;
}
