import { AnswerModel } from './AnswerModel';

export class QuestionModel {
    question: string;
    difficulty: number;
    answers: AnswerModel;
}
