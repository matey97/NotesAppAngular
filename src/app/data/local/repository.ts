import { NotesRepository } from "../notes-repository";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Note } from "../note";

const STORAGE_KEY = "notes";

@Injectable({
  providedIn: 'root'
})
export class LocalRepository implements NotesRepository {

  private subject: BehaviorSubject<Array<Note>> = new BehaviorSubject<Array<Note>>([]);
  private storage = localStorage;

  getNoteChanges(): Observable<Array<Note>> {
    const notes = this.listNotes();
    this.subject.next(notes);
    return this.subject;
  }

  insert(note: Note): void {
    const notes = this.listNotes();
    notes.push(note);
    this.storage.setItem(STORAGE_KEY, JSON.stringify(notes));
    this.subject.next(notes);
  }

  update(id: string, title: string, description: string): void {
    const notes = this.listNotes();
    const noteIndex = notes.findIndex((note) => note.id === id);
    notes[noteIndex] = { ...notes[noteIndex], title, description };

    this.storage.setItem(STORAGE_KEY, JSON.stringify(notes));
    this.subject.next(notes);
  }

  delete(id: string): void {
    throw new Error("Unimplemented!");
  }

  clear(): void {
    this.storage.clear();
  }

  private listNotes(): Array<Note> {
    const stringified = this.storage.getItem(STORAGE_KEY);
    let notes: Array<Note>;
    if (stringified !== null) {
      notes = JSON.parse(stringified);
    } else {
      notes = [];
    }

    return notes;
  }
}
