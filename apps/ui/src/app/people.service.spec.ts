import {inject, TestBed} from '@angular/core/testing';

import {PeopleService} from './people.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PeopleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PeopleService]
    });
  });

  it('should be created', inject([PeopleService], (service: PeopleService) => {
    expect(service).toBeTruthy();
  }));
});
