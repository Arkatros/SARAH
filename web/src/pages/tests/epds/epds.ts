import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestApiService, TestQuestion } from '../../../core/services/test-api.service';

@Component({
  selector: 'app-epds',
  imports: [CommonModule, FormsModule],
  templateUrl: './epds.html',
  styleUrl: './epds.css'
})
export class EPDS implements OnInit {
  private readonly api = inject(TestApiService);
  protected readonly questions = signal<TestQuestion[]>([]);
  protected readonly loaded = signal<boolean>(false);
  protected readonly answers: Record<string, number> = {};
  protected readonly score = signal<number | null>(null);
  protected readonly showingScore = signal<boolean>(false);

  ngOnInit(): void {
    this.api.getQuestions('EPDS').subscribe({
      next: (qs) => { this.questions.set(qs); this.loaded.set(true); },
      error: () => { this.questions.set([]); this.loaded.set(true); }
    });
  }

  protected submit(): void {
    const v = Math.floor(Math.random() * 11);
    this.score.set(v);
    this.showingScore.set(true);
  }

  protected closeScore(): void {
    this.showingScore.set(false);
  }

  protected scoreClass(): string {
    const v = this.score();
    if (v == null) return '';
    if (v < 4) return 'low';
    if (v < 7) return 'mid';
    return 'high';
  }
}
