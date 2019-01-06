import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionModel } from '../models/QuestionModel';
import { AnswerModel } from '../models/AnswerModel';

@Injectable({
  providedIn: 'root'
})
export class LoadQuestionsService {

  constructor(private http: HttpClient) { }

  loadQuestion(difficulty: number): Observable<any> {
    return this.http.get('assets/questions.json');
  }

  filterQuestions(difficulty: number, questions: QuestionModel[]): QuestionModel {
    if (difficulty === 1) {
      const filteredQuestions = this.groupQuestionsByDifficulty(1, questions);
      const question = this.selectRandomQuestionAndShuffleAnswers(filteredQuestions);
      return question;
    } else if (difficulty === 2) {
      const filteredQuestions = this.groupQuestionsByDifficulty(2, questions);
      const question = this.selectRandomQuestionAndShuffleAnswers(filteredQuestions);
      return question;
    } else {
      const filteredQuestions = this.groupQuestionsByDifficulty(3, questions);
      const question = this.selectRandomQuestionAndShuffleAnswers(filteredQuestions);
      return question;
    }
  }

  groupQuestionsByDifficulty(difficulty: number, questions: QuestionModel[]): QuestionModel[] {
    const filteredQuestions: QuestionModel[] = [];
    questions.forEach((q: QuestionModel) => {
      if (q.difficulty === difficulty) {
        filteredQuestions.push(q);
      }
    });
    return filteredQuestions;
  }

  selectRandomQuestionAndShuffleAnswers(questions: any[]): QuestionModel {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    for (let i = randomQuestion.answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomQuestion.answers[i], randomQuestion.answers[j]] =
        [randomQuestion.answers[j], randomQuestion.answers[i]];
    }
    return randomQuestion;
  }
}
