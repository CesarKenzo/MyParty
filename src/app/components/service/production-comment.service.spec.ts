import { TestBed } from '@angular/core/testing';
import { ProductionCommentService } from './production-comment.service';

describe('EventService', () => {
  let service: ProductionCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
