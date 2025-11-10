import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestApiService, TestQuestion } from '../../core/services/test-api.service';

type AnswerMap = Record<string, number>;

@Component({
  selector: 'app-test-runner',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section *ngIf="loaded(); else loading">
      <h2>{{ code() | uppercase }} Test</h2>

      <div *ngFor="let q of questions(); trackBy: trackByNumber" class="question">
        <h3>{{ q.number }}. {{ q.description }}</h3>
        <div class="options">
          <label *ngFor="let r of q.responses">
            <input
              type="radio"
              name="q-{{ q.number }}"
              [value]="r.value"
              [(ngModel)]="answersState()['q-' + q.number]"
            />
            {{ r.description }}
          </label>
        </div>

        <div *ngIf="q.subquestions?.length" class="subquestions">
          <div *ngFor="let s of q.subquestions">
            <h4>{{ q.number }}.{{ s.subquestionNumber }} {{ s.description }}</h4>
            <div class="options">
              <label *ngFor="let r of s.responses">
                <input
                  type="radio"
                  name="q-{{ q.number }}-s-{{ s.subquestionNumber }}"
                  [value]="r.value"
                  [(ngModel)]="answersState()['q-' + q.number + '-s-' + s.subquestionNumber]"
                />
                {{ r.description }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <button (click)="submit()" class="submit">Submit</button>
    </section>
    <ng-template #loading>
      <p>Loading...</p>
    </ng-template>
  `,
  styleUrl: './test-runner.component.css'
})
export class TestRunnerComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(TestApiService);

  protected readonly code = signal<string>('');
  protected readonly questions = signal<TestQuestion[]>([]);
  protected readonly loaded = signal<boolean>(false);
  protected readonly answersState = signal<AnswerMap>({});

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const c = (params.get('code') || '').toLowerCase();
      if (!c) return;
      this.code.set(c);
      this.loaded.set(false);
      this.api.getQuestions(c.toUpperCase()).subscribe({
        next: (qs) => {
          this.questions.set(qs);
          this.loaded.set(true);
        },
        error: () => {
          this.questions.set([]);
          this.loaded.set(true);
        }
      });
    });
  }

  ngOnDestroy(): void {}

  protected trackByNumber = (_: number, q: TestQuestion) => q.number;

  protected submit(): void {
    // Por ahora solo mostramos en consola; endpoint de score está listo en backend
    // En siguiente iteración, enviaremos POST a /api/tests/:code/score
    console.log('Answers', this.answersState());
    alert('Answers captured. Scoring endpoint not implemented yet in frontend.');
  }
}


