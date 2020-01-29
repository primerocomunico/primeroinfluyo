import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninInfluencerComponent } from './signin-influencer.component';

describe('SigninInfluencerComponent', () => {
  let component: SigninInfluencerComponent;
  let fixture: ComponentFixture<SigninInfluencerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninInfluencerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninInfluencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
