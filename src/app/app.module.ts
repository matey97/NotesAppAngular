import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NOTES_REPOSITORY } from "./data/notes-repository";
import { LocalRepository } from "./data/local/repository";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotesListComponent } from './view/notes-list/notes-list.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { DialogComponent } from './view/dialog/dialog.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [{provide: NOTES_REPOSITORY, useClass: LocalRepository}],
  bootstrap: [AppComponent]
})
export class AppModule { }
