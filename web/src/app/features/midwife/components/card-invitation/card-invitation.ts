import { Component } from '@angular/core';
import { InvitePatient } from "../../../patient/components/invite-patient/invite-patient";
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-card-invitation',
  imports: [
    InvitePatient,
    MatCard,
    MatIcon
  ],
  templateUrl: './card-invitation.html',
  styleUrl: './card-invitation.css'
})
export class CardInvitation {

}
