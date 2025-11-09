import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeDashboard } from './midwife-dashboard';

describe('MidwifeDashboard', () => {
  let component: MidwifeDashboard;
  let fixture: ComponentFixture<MidwifeDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MidwifeDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MidwifeDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
