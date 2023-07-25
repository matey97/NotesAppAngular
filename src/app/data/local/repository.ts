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
    const stringified = this.storage.getItem(STORAGE_KEY);
    let notes: Array<Note>;
    if (stringified !== null) {
      notes = JSON.parse(stringified);
    } else {
      notes = [];
    }

    this.subject.next(notes);
    return this.subject;
  }

  insert(note: Note): void {
    const stringified = this.storage.getItem(STORAGE_KEY);
    let notes: Array<Note>;
    if (stringified !== null) {
      notes = JSON.parse(stringified);
    } else {
      notes = [];
    }

    notes.push(note);
    this.storage.setItem(STORAGE_KEY, JSON.stringify(notes));
    this.subject.next(notes);
  }

  clear(): void {
    this.storage.clear();
  }
}
