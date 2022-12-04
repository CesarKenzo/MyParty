import { TestBed } from '@angular/core/testing';
import { UserTicketService } from './user_ticket.service';

describe('UserService', () => {
  let service: UserTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});