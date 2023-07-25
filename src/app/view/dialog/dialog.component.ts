import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  noteTitle: string = '';
  noteDescription: string = '';

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  onDialogClosed() {
    this.dialogRef.close(undefined);
  }

  onDialogCompleted() {
    this.dialogRef.close({
      noteTitle: this.noteTitle,
      noteDescription: this.noteDescription
    });
  }
}
