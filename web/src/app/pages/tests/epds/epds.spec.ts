import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EPDS } from './epds';

describe('EPDS', () => {
  let component: EPDS;
  let fixture: ComponentFixture<EPDS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EPDS]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EPDS);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
