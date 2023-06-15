import { TestBed } from '@angular/core/testing';

import { DeletedNotesService } from './deleted-notes.service';

describe('DeletedNotesService', () => {
  let service: DeletedNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletedNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
