import { Component, OnInit } from '@angular/core';
import { LoadQuestionsService } from '../providers/load-questions.service';
import { QuestionModel } from '../models/QuestionModel';

@Component({
  selector: 'app-game-studio',
  templateUrl: './game-studio.component.html',
  styleUrls: ['./game-studio.component.scss']
})
export class GameStudioComponent implements OnInit {

  currentQuestion: QuestionModel;
  answeredQuestion = 0;
  constructor(private loadQuestionService: LoadQuestionsService) { }

  ngOnInit() {
    this.getQuestion();
  }

  checkAnswer(answer: { value: string, isCorrect: boolean }) {
    if (answer.isCorrect) {
      console.log('CORRECT!');
      this.getQuestion();

    } else {
      console.log('WRONG!');
    }
  }

  getQuestion() {
    let difficulty: number;
    if (this.answeredQuestion <= 5) {
      difficulty = 1;
    } else if (this.answeredQuestion <= 10) {
      difficulty = 2;
    } else {
      difficulty = 3;
    }
    this.loadQuestionService.loadQuestion(difficulty).subscribe(data => {
      this.currentQuestion = this.loadQuestionService.filterQuestions(difficulty, data);
      this.answeredQuestion++;
    });
  }
}
