import { TestBed } from '@angular/core/testing';
import { MktTicketService } from '../service/marketplace_ticket.service'

describe('MktTicketService', () => {
  let service: MktTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MktTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});