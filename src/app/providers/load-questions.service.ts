
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionModel } from '../models/QuestionModel';
const fs = require('fs');
const path = require('path');

@Injectable({
  providedIn: 'root'
})
export class LoadQuestionsService {

  constructor(private http: HttpClient) { }

  loadQuestion(difficulty: number): Observable<any> {
    return this.http.get('assets/questions.json');
  }

  filterQuestions(difficulty: number, questions: QuestionModel[]): QuestionModel {
    const filteredQuestions = this.groupQuestionsByDifficulty(difficulty, questions);
    return this.selectRandomQuestionAndShuffleAnswers(filteredQuestions);
  }

  groupQuestionsByDifficulty(difficulty: number, questions: QuestionModel[]): QuestionModel[] {
    const filteredQuestions: QuestionModel[] = [];
    questions.forEach((q: QuestionModel) => {
      if (Number(q.difficulty) === difficulty) {
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

  /*  Function reloads app because it activates the 'electron-reload' in main.ts as it changes file in the app*/
  createQuestion(question: any) {
    fs.readFile(path.resolve('src/assets/questions.json'), 'utf-8', function (err, data) {
      if (err) { throw err; }
      const questionList = JSON.parse(data);
      questionList.push(question);

      fs.writeFileSync(path.normalize('src/assets/questions.json'), JSON.stringify(questionList), 'utf8',
        function (error) {
          if (error) { throw error; }
        });
    });
  }
}
