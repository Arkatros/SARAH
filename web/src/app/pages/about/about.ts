import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-about',
  imports: [MatCardModule, MatChipsModule, MatIconModule, MatDividerModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})

export class About {
  instituto = 'INSTITUTO DE FORMACIÓN TÉCNICA SUPERIOR N°11';
  carrera = 'Tecnicatura Superior en Desarrollo de Software';
  team = ['Natalia Moreira', 'Abel Montes Vega', 'Alejandro Sandrin', 'Jonathan Massacesi'];
}
