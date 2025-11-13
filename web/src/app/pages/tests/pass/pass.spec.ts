import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PASS } from './pass';

describe('PASS', () => {
  let component: PASS;
  let fixture: ComponentFixture<PASS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PASS]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PASS);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
