import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ANRQ } from './anrq';

describe('ANRQ', () => {
  let component: ANRQ;
  let fixture: ComponentFixture<ANRQ>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ANRQ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ANRQ);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
