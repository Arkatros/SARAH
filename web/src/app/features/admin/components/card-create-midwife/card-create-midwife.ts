import { Component } from '@angular/core';
import { CreateFormMidwife } from "../../../midwife/components/create-form/create-form-midwife";
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-card-create-midwife',
  imports: [
    CreateFormMidwife,
    MatCard
  ],
  templateUrl: './card-create-midwife.html',
  styleUrl: './card-create-midwife.css'
})
export class CardCreateMidwife {

}
