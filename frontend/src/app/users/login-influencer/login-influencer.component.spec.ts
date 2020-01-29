import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginInfluencerComponent } from './login-influencer.component';

describe('LoginInfluencerComponent', () => {
  let component: LoginInfluencerComponent;
  let fixture: ComponentFixture<LoginInfluencerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginInfluencerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginInfluencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
