import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceTicketsComponent } from './marketplace-tickets.component';

describe('MarketplaceTicketsComponent', () => {
  let component: MarketplaceTicketsComponent;
  let fixture: ComponentFixture<MarketplaceTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplaceTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketplaceTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
