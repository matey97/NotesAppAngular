import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Note } from "../../data/note";
import { NotesControllerService } from "../../services/notes-controller.service";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent {
  notes$: Observable<Note[]>;

  constructor(
    private dialogService: MatDialog,
    private snackBar: MatSnackBar,
    private notesController: NotesControllerService
  ) {
    this.notes$ = this.notesController.getNotes();
  }

  onCreateNoteTap() {
    const dialogRef = this.dialogService.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.notesController.createNote(result.noteTitle, result.noteDescription)
        .catch((e) => this.snackBar.open(
          `¡Nota no añadida! Causa: ${e.message}`,
          "OK",
          { duration: 3000 }
        ));
    });
  }
}
