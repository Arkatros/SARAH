import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestApiService, TestQuestion } from '../../../core/services/test-api.service';

@Component({
  selector: 'app-anrq',
  imports: [CommonModule, FormsModule],
  templateUrl: './anrq.html',
  styleUrl: './anrq.css'
})
export class ANRQ implements OnInit {
  private readonly api = inject(TestApiService);
  protected readonly questions = signal<TestQuestion[]>([]);
  protected readonly loaded = signal<boolean>(false);
  protected readonly answers: Record<string, number> = {};

  ngOnInit(): void {
    this.api.getQuestions('ANRQ').subscribe({
      next: (qs) => { this.questions.set(qs); this.loaded.set(true); },
      error: () => { this.questions.set([]); this.loaded.set(true); }
    });
  }
}
