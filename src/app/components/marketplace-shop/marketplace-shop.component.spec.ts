import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceShopComponent } from './marketplace-shop.component';

describe('MarketplaceShopComponent', () => {
  let component: MarketplaceShopComponent;
  let fixture: ComponentFixture<MarketplaceShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplaceShopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketplaceShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
