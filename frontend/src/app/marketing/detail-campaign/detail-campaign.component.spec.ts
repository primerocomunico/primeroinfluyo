import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCampaignComponent } from './detail-campaign.component';

describe('DetailCampaignComponent', () => {
  let component: DetailCampaignComponent;
  let fixture: ComponentFixture<DetailCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
