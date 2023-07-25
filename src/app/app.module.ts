import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NOTES_REPOSITORY } from "./data/notes-repository";
import { LocalRepository } from "./data/local/repository";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: NOTES_REPOSITORY, useClass: LocalRepository}],
  bootstrap: [AppComponent]
})
export class AppModule { }
