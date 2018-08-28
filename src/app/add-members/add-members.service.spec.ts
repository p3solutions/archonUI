import { TestBed, inject } from '@angular/core/testing';
import { AddMembersService } from './add-members.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddMembersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        AddMembersService, HttpClientModule
      ]
    });
  });

  it('should be created', inject([AddMembersService], (service: AddMembersService) => {
    expect(service).toBeTruthy();
  }));
});
