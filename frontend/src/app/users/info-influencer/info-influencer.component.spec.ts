import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoInfluencerComponent } from './info-influencer.component';

describe('InfoInfluencerComponent', () => {
  let component: InfoInfluencerComponent;
  let fixture: ComponentFixture<InfoInfluencerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoInfluencerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoInfluencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
