import { Component } from '@angular/core';
import { MatGridList, MatGridTile, MatGridTileText } from '@angular/material/grid-list';
import { CardHome } from "../../components/card-home/card-home";
import { CardInvitation } from "../../components/card-invitation/card-invitation";
import { CardTable } from "../../components/card-table/card-table";

@Component({
  selector: 'app-midwife-dashboard',
  imports: [
    MatGridList,
    MatGridTile,
    CardHome,
    CardInvitation,
    CardTable
],
  templateUrl: './midwife-dashboard.html',
  styleUrl: './midwife-dashboard.css'
})
export class MidwifeDashboard {

}
