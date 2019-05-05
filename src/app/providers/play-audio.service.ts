
import { Injectable } from '@angular/core';
const path = require('path');

@Injectable({
    providedIn: 'root'
})
export class PlayAudioService {
    questionAudio = new Audio();

    constructor() { }


    playInitialAudio() {
        const audio = new Audio();
        audio.src = path.normalize('assets/audio/letsplaymusic.mp3').toString();
        audio.load();
        audio.play();
        audio.onended = () => {
            audio.onended = null;
            this.playQuestionTheme();
        }
    }

    playQuestionTheme() {
        this.questionAudio.src = path.normalize('assets/audio/difficulty1music.mp3').toString();

        this.questionAudio.load();
        this.questionAudio.play();
        this.questionAudio.onended = () => {
            this.questionAudio.onended = null;
            this.playQuestionTheme();
        }
    }

    playCorrectTheme(flag?: string) {
        this.questionAudio.pause();
        const audio = new Audio();
        audio.src = path.normalize('assets/audio/correctAnswerMusic.mp3').toString();
        audio.load();
        audio.play();
        if (flag !== 'final') {
            setTimeout(() => {
                audio.onended = () => {
                    audio.onended = null;
                    this.playQuestionTheme();
                }
            }, 3000);
        }
    }

    playWrongTheme() {
        this.questionAudio.pause();
        const audio = new Audio();
        audio.src = path.normalize('assets/audio/wrongAnswerMusic.mp3').toString();
        audio.load();
        audio.play();
    }

    playFinalTheme(isTrue: boolean) {
        this.questionAudio.pause();
        const audio = new Audio();
        audio.src = path.normalize('assets/audio/finalAnswerMusic.mp3').toString();
        audio.load();
        audio.play();
        if (isTrue) {
            audio.onended = () => {
                audio.onended = null;
                this.playCorrectTheme('final');
            }
        } else {
            audio.onended = () => {
                audio.onended = null;
                this.playWrongTheme();
            }
        }

    }

}


