import { Component, OnInit } from '@angular/core';
import { LoadQuestionsService } from '../providers/load-questions.service';
import { QuestionModel } from '../models/QuestionModel';
import { PlayAudioService } from '../providers/play-audio.service';

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
  difficulty = 0;

  constructor(
    private loadQuestionService: LoadQuestionsService,
    private playAudioService: PlayAudioService) { }

  ngOnInit() {
    this.getQuestion();
    this.loadEventListeners();
    this.playAudioService.playInitialAudio();
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
    let interval = 500;
    e.target.classList.add('selected');
    if (this.answeredQuestion === 15) {
      interval = 4000;
    }
    setTimeout(() => {
      right.classList.remove('hover');
      right.classList.remove('selected');
    }, interval);

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
    if (answer.isCorrect && this.answeredQuestion !== 15) {
      this.playAudioService.playCorrectTheme();
      setTimeout(() => {
        this.getQuestion();
      }, 3600);
    } else if (this.answeredQuestion === 15) {
      this.playAudioService.playFinalTheme(answer.isCorrect);
    } else {
      this.playAudioService.playWrongTheme();
      // go to home page
    }
  }

  testF(e) {
    console.log('runa functions');
  }

  getQuestion() {
    if (this.answeredQuestion <= 5) {
      this.difficulty = 1;
    } else if (this.answeredQuestion <= 10) {
      this.difficulty = 2;
    } else {
      this.difficulty = 3;
    }
    this.loadQuestionService.loadQuestion(this.difficulty).subscribe(data => {
      this.currentQuestion = this.loadQuestionService.filterQuestions(this.difficulty, data);
      this.answeredQuestion++;
    });
  }
}
