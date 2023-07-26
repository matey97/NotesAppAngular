import { NOTES_REPOSITORY, NotesRepository } from "../app/data/notes-repository";
import { NotesControllerService } from "../app/services/notes-controller.service";
import { TestBed } from "@angular/core/testing";
import { LocalRepository } from "../app/data/local/repository";
import { firstValueFrom } from "rxjs";
import { EmptyTitleError } from "../app/errors/empty-title";
import { NoteNotFoundError } from "../app/errors/not-found";

describe("NotesControllerService acceptance tests", () => {

  let notesRepository: NotesRepository;
  let notesControllerService: NotesControllerService;

  const emptyTitle = "";
  const title1 = "Test title 1";
  const description1 = "Test description 1";
  const title2 = "Test title 2";
  const description2 = "Test description 2";

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [{provide: NOTES_REPOSITORY, useClass: LocalRepository}]});
    notesRepository = TestBed.inject(LocalRepository);
    notesControllerService = TestBed.inject(NotesControllerService);
  });

  it("H01_E01", async () => {
    // Given: no hay ninguna nota

    // When: se intenta crear una nota con título y descripción
    await notesControllerService.createNote(title1, description1);

    // Then: se almacena la nota con el titulo y descripción dados
    const notes = await firstValueFrom(notesControllerService.getNotes());
    expect(notes.length).toBe(1);
    expect(notes[0]).toEqual(jasmine.objectContaining({
      title: title1,
      description: description1
    }));
  });

  it("H01_E03", async () => {
    // Given: no hay ninguna nota

    // When: se intenta crear una nota sin título
    await expectAsync(notesControllerService.createNote(emptyTitle, description1))
      .toBeRejectedWith(new EmptyTitleError()); // Then: se lanza la excepción EmptyTitleError
  });

  it("H02_E01", async () => {
    // Given: no hay ninguna nota

    // When: se consultan las notas
    const notes = await firstValueFrom(notesControllerService.getNotes());

    // Then: se obtiene una lista vacía
    expect(notes.length).toBe(0);
  });

  it("H02_E02", async () => {
    // Given: hay varias notas almacenadas
    await notesControllerService.createNote(title1, description1);
    await notesControllerService.createNote(title2, description2);

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

  it("H03_E01", async () => {
    // Given: hay varias notas almacenadas
    await notesControllerService.createNote(title1, description1);
    await notesControllerService.createNote(title2, description2);

    const notesObservable = notesControllerService.getNotes();
    let notes = await firstValueFrom(notesObservable);
    const noteId2 = notes[1].id;

    // When: se intenta cambiar el contenido de una nota
    const newTitle = "New note title";
    await notesControllerService.updateNote(noteId2, newTitle, description2);

    // Then: la nota se actualiza correctamente
    notes = await firstValueFrom(notesObservable);

    expect(notes.length).toBe(2);
    expect(notes[1]).toEqual(jasmine.objectContaining({
      title: newTitle,
      description: description2
    }));
  });

  it("H03_E02", async () => {
    // Given: hay varias notas almacenadas
    await notesControllerService.createNote(title1, description1);
    await notesControllerService.createNote(title2, description2);

    const notes = await firstValueFrom(notesControllerService.getNotes());
    const noteId2 = notes[1].id;

    // When: se intenta cambiar el contenido de una nota con un título inválido
    const newTitle = "";
    await expectAsync(notesControllerService.updateNote(noteId2, newTitle, description2))
      .toBeRejectedWith(new EmptyTitleError()); // Then: se lanza la excepción EmptyTitleError
  });

  it("H03_E03", async () => {
    // Given: hay varias notas almacenadas
    await notesControllerService.createNote(title1, description1);
    await notesControllerService.createNote(title2, description2);


    // When: se intenta cambiar el contenido de una nota con un título inválido
    const newTitle = "Other title";
    await expectAsync(notesControllerService.updateNote("", newTitle, description2))
      .toBeRejectedWith(new NoteNotFoundError("")); // Then: se lanza la excepción NoteNotFoundError
  });

  it("H04_E01", async () => {
    // Given: hay varias notas almacenadas
    await notesControllerService.createNote(title1, description1);
    await notesControllerService.createNote(title2, description2);

    const notesObservable = notesControllerService.getNotes();
    let notes = await firstValueFrom(notesObservable);
    const noteId1 = notes[0].id;

    // When: se intenta borrar una nota usando un id inválido
    await notesControllerService.deleteNote(noteId1);

    // Then: se elimina la nota de la base de datos
    notes = await firstValueFrom(notesObservable);

    expect(notes.length).toBe(1);
    expect(notes[0]).toEqual(jasmine.objectContaining({
      title: title2,
      description: description2
    }));
  });

  it("H04_E02", async () => {
    // Given: hay varias notas almacenadas
    await notesControllerService.createNote(title1, description1);
    await notesControllerService.createNote(title2, description2);

    // When: se intenta borrar una nota usando un id inválido
    await expectAsync(notesControllerService.deleteNote(""))
      .toBeRejectedWith(new NoteNotFoundError("")); // Then: se lanza la excepción NoteNotFoundError
  });

  afterEach(() => {
    notesRepository.clear();
  });
});
