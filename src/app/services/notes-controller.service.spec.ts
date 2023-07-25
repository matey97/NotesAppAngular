import { TestBed } from '@angular/core/testing';

import { NotesControllerService } from './notes-controller.service';

describe('NotesControllerService', () => {
  let service: NotesControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
