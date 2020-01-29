import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCompanyComponent } from './info-company.component';

describe('InfoCompanyComponent', () => {
  let component: InfoCompanyComponent;
  let fixture: ComponentFixture<InfoCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
