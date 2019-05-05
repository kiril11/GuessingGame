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
  answers: HTMLCollection;
  called = false;
  constructor(private loadQuestionService: LoadQuestionsService) { }

  ngOnInit() {
    this.getQuestion();
    this.loadEventListeners();
  }

  loadEventListeners() {
    this.answers = document.getElementsByClassName('available2click');

    for (let i = 0; i < this.answers.length; i++) {

        this.answers[i].addEventListener('mouseover', this.setHover, true);

      this.answers[i].addEventListener('mouseout', this.removeHover, false);
      this.answers[i].addEventListener('click', this.setAnimation, false);
    }
  }

  setAnimation(e) {
    const right = document.getElementById('true');
    e.target.classList.add('selected');
    setTimeout(() => {
      right.classList.remove('hover');
      right.classList.remove('selected');
    }, 500);

    right.classList.add('animation');
    this.called = true;
  }

  setHover(e) {
    e.target.classList.toggle('hover');
  }

  removeHover(e) {
    e.target.classList.remove('hover');
  }

  checkAnswer(answer: { value: string, isCorrect: boolean }) {
    if (answer.isCorrect) {
      setTimeout(() => {
        this.getQuestion();
      }, 1500);
    } else {
      // go to home page
    }
  }

  testF(e) {
    console.log('runa functions');
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
