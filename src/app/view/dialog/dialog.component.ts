import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogData } from "./dialog-data";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onDialogClosed() {
    this.dialogRef.close(undefined);
  }

  onDialogCompleted() {
    this.dialogRef.close({
      noteTitle: this.data.noteTitle,
      noteDescription: this.data.noteDescription
    });
  }
}
