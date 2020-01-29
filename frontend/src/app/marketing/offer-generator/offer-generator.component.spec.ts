import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferGeneratorComponent } from './offer-generator.component';

describe('OfferGeneratorComponent', () => {
  let component: OfferGeneratorComponent;
  let fixture: ComponentFixture<OfferGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
