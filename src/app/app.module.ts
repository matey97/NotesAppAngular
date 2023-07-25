import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NOTES_REPOSITORY } from "./data/notes-repository";
import { LocalRepository } from "./data/local/repository";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{provide: NOTES_REPOSITORY, useClass: LocalRepository}],
  bootstrap: [AppComponent]
})
export class AppModule { }
