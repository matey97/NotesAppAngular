import { NOTES_REPOSITORY, NotesRepository } from "../app/data/notes-repository";
import { NotesControllerService } from "../app/services/notes-controller.service";
import { TestBed } from "@angular/core/testing";
import { LocalRepository } from "../app/data/local/repository";
import { firstValueFrom } from "rxjs";
import { EmptyTitleError } from "../app/errors/empty-title";

describe("NotesControllerService acceptance tests", () => {

  let notesRepository: NotesRepository;
  let notesControllerService: NotesControllerService;

  const emptyTitle = "";
  const title1 = "Test title 1";
  const description1 = "Test description 1";

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

  afterEach(() => {
    notesRepository.clear();
  });
});
