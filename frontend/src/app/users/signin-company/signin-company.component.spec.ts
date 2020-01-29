import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninCompanyComponent } from './signin-company.component';

describe('SigninCompanyComponent', () => {
  let component: SigninCompanyComponent;
  let fixture: ComponentFixture<SigninCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
