import { Component } from '@angular/core';
import { InvitePatient } from "../../../patient/components/invite-patient/invite-patient";

@Component({
  selector: 'app-card-invitation',
  imports: [InvitePatient],
  templateUrl: './card-invitation.html',
  styleUrl: './card-invitation.css'
})
export class CardInvitation {

}
