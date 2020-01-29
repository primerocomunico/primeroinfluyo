import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignGeneratorComponent } from './campaign-generator.component';

describe('CampaignGeneratorComponent', () => {
  let component: CampaignGeneratorComponent;
  let fixture: ComponentFixture<CampaignGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
