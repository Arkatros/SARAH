import { Component } from '@angular/core';
import { CreateFormMidwife } from "../../../midwife/components/create-form/create-form-midwife";

@Component({
  selector: 'app-dashboard',
  imports: [CreateFormMidwife],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {

}
