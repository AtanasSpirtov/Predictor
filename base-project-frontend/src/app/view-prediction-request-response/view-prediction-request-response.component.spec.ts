import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPredictionRequestResponseComponent } from './view-prediction-request-response.component';

describe('ViewPredictionRequestResponseComponent', () => {
  let component: ViewPredictionRequestResponseComponent;
  let fixture: ComponentFixture<ViewPredictionRequestResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPredictionRequestResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPredictionRequestResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
