import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ANRQ } from './anrq/anrq';
import { EPDS } from './epds/epds';
import { PASS } from './pass/pass';

@Component({
  selector: 'app-test-runner',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ANRQ, EPDS, PASS],
  template: `
    <ng-container [ngSwitch]="code()">
      <app-anrq *ngSwitchCase="'anrq'"></app-anrq>
      <app-epds *ngSwitchCase="'epds'"></app-epds>
      <app-pass *ngSwitchCase="'pass'"></app-pass>
      <section *ngSwitchDefault class="test-wrapper">
        <p>Unknown test code: {{ code() }}</p>
        <a routerLink="/tests/epds">Go to EPDS</a>
      </section>
    </ng-container>
  `,
  styleUrl: './test-runner.component.css'
})
export class TestRunnerComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);

  protected readonly code = signal<string>('');

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const c = (params.get('code') || '').toLowerCase();
      this.code.set(c);
    });
  }

  ngOnDestroy(): void {}
}


