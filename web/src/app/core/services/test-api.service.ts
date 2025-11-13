import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export type TestResponseOption = {
  description: string;
  value: number;
};

export type TestSubquestion = {
  subquestionNumber: number | null;
  description: string;
  responses: TestResponseOption[];
};

export type TestQuestion = {
  number: number;
  description: string;
  responses: TestResponseOption[];
  subquestions?: TestSubquestion[];
};

export type TestQuestionsPayload = {
  test: string;
  questions: TestQuestion[];
};

@Injectable({ providedIn: 'root' })
export class TestApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBase = 'http://127.0.0.1:3000/api';

  getQuestions(testCode: string): Observable<TestQuestion[]> {
    return this.http
      .get<TestQuestionsPayload>(`${this.apiBase}/tests/${testCode}/questions`)
      .pipe(map((p) => p.questions));
  }
}


