import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitePatient } from './invite-patient';

describe('InvitePatient', () => {
  let component: InvitePatient;
  let fixture: ComponentFixture<InvitePatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitePatient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitePatient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
