import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadQuestionsService } from '../providers/load-questions.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  constructor(private loadQuestionService: LoadQuestionsService) { }

  ngOnInit() {
  }

  addQuestion(form: NgForm) {
    const questionBody = form.value;
    const realQuestion = {
      question: questionBody.question, difficulty: questionBody.difficulty,
      answers: [{ value: questionBody.answer1, isCorrect: questionBody.isCorrect1 === '' ? false : true },
      { value: questionBody.answer2, isCorrect: questionBody.isCorrect2 === '' ? false : true },
      { value: questionBody.answer3, isCorrect: questionBody.isCorrect3 === '' ? false : true },
      { value: questionBody.answer4, isCorrect: questionBody.isCorrect4 === '' ? false : true }]
    };
    this.loadQuestionService.createQuestion(realQuestion);
  }
}
