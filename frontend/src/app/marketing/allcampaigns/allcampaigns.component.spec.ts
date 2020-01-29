import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcampaignsComponent } from './allcampaigns.component';

describe('AllcampaignsComponent', () => {
  let component: AllcampaignsComponent;
  let fixture: ComponentFixture<AllcampaignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllcampaignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllcampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
