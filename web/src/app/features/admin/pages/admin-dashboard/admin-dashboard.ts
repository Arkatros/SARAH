import { Component } from '@angular/core';
import { CardCreateMidwife } from "../../components/card-create-midwife/card-create-midwife";

@Component({
  selector: 'app-dashboard',
  imports: [ CardCreateMidwife],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {

}
