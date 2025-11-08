import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../../core/navbar/navbar.component";
import { FooterComponent } from "../../../core/footer/footer.component";

@Component({
  selector: 'app-common-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './common-layout.html',
  styleUrl: './common-layout.css'
})
export class CommonLayout {

}
