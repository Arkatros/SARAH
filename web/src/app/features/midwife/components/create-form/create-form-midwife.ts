import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { CreateMidWife } from '../../models/create-midwife';
import { MidwifeService } from '../../../../core/services/midwife-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-form-midwife',
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatInput,
    MatFormField,
    MatCheckbox,
    MatButton,
    MatError
  ],
  templateUrl: './create-form-midwife.html',
  styleUrl: './create-form-midwife.css'
})
export class CreateFormMidwife {
  public form: FormGroup;
  private _midWifeService: MidwifeService = inject(MidwifeService);
  private _snackBar = inject(MatSnackBar);
  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group(
      {
        name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
        lastName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
        email: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
        phone: ['', [Validators.required, PhoneValidator.validPhone, Validators.maxLength(14)]],
        APC: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
        registrationNumber: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
        employerName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
        policies: [false, [Validators.requiredTrue]]
      }
    );
  }

  getControl(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const createMidwifeData: CreateMidWife = this.form.value;
      this._midWifeService.createMidwife(createMidwifeData).subscribe({
        next: (response) => {
          this.openSnackBar(response.message, 'Close');
          this.form.reset();
        },
        error: (error) => {
          console.error('Error creating midwife:', error.message);
          this.openSnackBar('Failed to create midwife. Please try again.', 'Close');
        }
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000});
  }
}

class PhoneValidator {
  static validPhone(control: FormControl) {
    const pattern = /^(\((03|04|06|07|09)\)\d{7})|(\((021|022|025|027|028|029)\)\d{6,8})|((0508|0800|0900)\d{5,8})$/;
    const value: string = control.value as string;
    const phoneNumber = value.replace(/[^\d()]/g, '');
    const isValid = pattern.test(phoneNumber);
    console.log('Phone validation for', phoneNumber, ':', isValid);
    return isValid ? null : { validPhone: true };
  }
}
