import { NOTES_REPOSITORY, NotesRepository } from "../data/notes-repository";
import { NotesControllerService } from "./notes-controller.service";
import { LocalRepository } from "../data/local/repository";
import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { EmptyTitleError } from "../errors/empty-title";

describe('NotesControllerService integration tests', () => {
  let notesControllerService: NotesControllerService;
  let notesRepository: NotesRepository;

  const emptyTitle = "";
  const title1 = "Test title 1";
  const description1 = "Test description 1";

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

  afterEach(() => {
    notesRepository = undefined!;
  });
});
