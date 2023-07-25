import { NOTES_REPOSITORY, NotesRepository } from "../data/notes-repository";
import { NotesControllerService } from "./notes-controller.service";
import { LocalRepository } from "../data/local/repository";
import { TestBed } from "@angular/core/testing";
import { firstValueFrom, Observable } from "rxjs";
import { EmptyTitleError } from "../errors/empty-title";
import { Note } from "../data/note";

describe('NotesControllerService integration tests', () => {
  let notesControllerService: NotesControllerService;
  let notesRepository: NotesRepository;

  const emptyTitle = "";
  const id1 = "id1";
  const title1 = "Test title 1";
  const description1 = "Test description 1";
  const id2 = "id2";
  const title2 = "Test title 2";
  const description2 = "Test description 2";

  const note1: Note = {
    id: id1,
    title: title1,
    description: description1,
    date: new Date()
  };

  const note2: Note = {
    id: id2,
    title: title2,
    description: description2,
    date: new Date()
  };

  beforeEach(() => {
    notesRepository = new LocalRepository();
    spyOn(notesRepository, "insert");

    TestBed.configureTestingModule({providers: [{provide: NOTES_REPOSITORY, useValue: notesRepository}]});
    notesControllerService = TestBed.inject(NotesControllerService);
  });

  it("H01_E01", async () => {
    // Given: no hay ninguna nota
    spyOn(notesRepository, "getNoteChanges").and.returnValue(
      new Observable((subscriber) => subscriber.next([]))
    );

    // When: se intenta crear una nota con título y descripción
    await notesControllerService.createNote(title1, description1);

    // Then: se almacena la nota con el titulo y descripción dados
    expect(notesRepository.insert).toHaveBeenCalledWith(jasmine.objectContaining({
      title: title1,
      description: description1
    }));
  });

  it("H01_E03", async () => {
    // Given: no hay ninguna nota
    spyOn(notesRepository, "getNoteChanges").and.returnValue(
      new Observable((subscriber) => subscriber.next([]))
    );

    // When: se intenta crear una nota sin título
    await expectAsync(notesControllerService.createNote(emptyTitle, description1))
      .toBeRejectedWith(new EmptyTitleError()); // Then: se lanza la excepción EmptyTitleError
    expect(notesRepository.insert).not.toHaveBeenCalled();
  });

  it("H02_E01", async () => {
    // Given: no hay ninguna nota
    spyOn(notesRepository, "getNoteChanges").and.returnValue(
      new Observable((subscriber) => subscriber.next([]))
    );

    // When: se consultan las notas
    const notes = await firstValueFrom(notesControllerService.getNotes());

    // Then: se obtiene una lista vacía
    expect(notes.length).toBe(0);
  });

  it("H02_E02", async () => {
    // Given: hay varias notas almacenadas
    spyOn(notesRepository, "getNoteChanges").and.returnValue(
      new Observable((subscriber) => subscriber.next([
        note1, note2
      ]))
    );

    // When: se consultan las notas
    const notes = await firstValueFrom(notesControllerService.getNotes());

    // Then: se obtiene una lista con las notas almacenadas
    expect(notes.length).toBe(2);
    expect(notes[0]).toEqual(jasmine.objectContaining({
      title: title1,
      description: description1
    }));
    expect(notes[1]).toEqual(jasmine.objectContaining({
      title: title2,
      description: description2
    }));
  });

  afterEach(() => {
    notesRepository = undefined!;
  });
});
