import { TestBed } from '@angular/core/testing';
import { EventCommentService } from './event-comment.service';

describe('EventService', () => {
  let service: EventCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
