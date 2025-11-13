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
  protected readonly extra: { q8_sexual: boolean; q8_physical: boolean } = { q8_sexual: false, q8_physical: false };
  protected readonly multi: Record<string, boolean> = {};
  protected readonly score = signal<number | null>(null);
  protected readonly showingScore = signal<boolean>(false);

  ngOnInit(): void {
    this.api.getQuestions('ANRQ').subscribe({
      next: (qs) => { this.questions.set(qs); this.loaded.set(true); },
      error: () => { this.questions.set([]); this.loaded.set(true); }
    });
  }


  //Método para "marcar" las preguntas que deben abrir subquestions si se pone "yes"
  protected showSub(q: TestQuestion): boolean {
    const ans = this.answers['q-' + q.number];
    if (ans == null) return false;
    if (!q.subquestions || q.subquestions.length === 0) return false;
    // Si la pregunta es Yes/No, mostrar subpreguntas solo si es Yes (valor > 0)
    const labels = (q.responses || []).map(r => r.description.trim().toLowerCase());
    const isYesNo = labels.includes('yes') && labels.includes('no');
    if (isYesNo) return ans > 0;
    // En otros casos (Likert), mostrar si hay respuesta seleccionada
    return true;
  }

  protected showThisSub(q: TestQuestion, subNumber: number | null): boolean {
    if (subNumber == null) return false;
    if (q.number === 8) return false; // Q8: capturamos detalles con checkboxes inline, no mostramos sub-bloc
    // Regla específica: en Q1, la sub C (3) va siempre; A y B dependen de Yes.
    if (q.number === 1) {
      if (subNumber === 3) return true; // 1.c siempre
      const ans = this.answers['q-' + q.number];
      return ans != null && ans > 0; // 1.a y 1.b solo si Yes
    }
    // Por defecto usar regla general
    return this.showSub(q);
  }

  protected letterFor(n: number | null): string {
    if (!n || n < 1) return '';
    const code = 'a'.charCodeAt(0) + (n - 1);
    return String.fromCharCode(code);
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
