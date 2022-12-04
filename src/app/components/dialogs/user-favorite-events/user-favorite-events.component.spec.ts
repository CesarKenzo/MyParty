import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFavoriteEventsComponent } from './user-favorite-events.component';

describe('UserFavoriteEventsComponent', () => {
  let component: UserFavoriteEventsComponent;
  let fixture: ComponentFixture<UserFavoriteEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFavoriteEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFavoriteEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
