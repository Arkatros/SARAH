import { Component } from '@angular/core';
import { CreateFormMidwife } from "../../../midwife/components/create-form/create-form-midwife";
import { MatCard } from '@angular/material/card';
import { LoginForm } from "../../../auth/login-form/login-form";

@Component({
  selector: 'app-card-create-midwife',
  imports: [
    CreateFormMidwife,
    MatCard,
    LoginForm
],
  templateUrl: './card-create-midwife.html',
  styleUrl: './card-create-midwife.css'
})
export class CardCreateMidwife {

}
