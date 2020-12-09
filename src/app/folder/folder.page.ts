import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { QuizQuestion } from '../interfaces/QuizQuestion';
import { FirebaseService } from '../services/firebase.service';

// import { CategoriesPage } from '../categories/categories.page';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  @Input() answer: string;
  @Input() formGroup: FormGroup;
  @Output() question: QuizQuestion;
  totalQuestions: number;
  completionTime: number;
  correctAnswersCount = 0;

  questions: any;
  questionID = 0;
  currentQuestion = 0;
  questionIndex: number;
  correctAnswer: boolean;
  hasAnswer: boolean;
  disabled: boolean;
  quizIsOver: boolean;
  progressValue: number;
  interval: any;
  
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute, private route: Router, public firebaseService: FirebaseService) { }

  ngOnInit() {
    return(
      this.firebaseService.getAllQuestions(),
      this.questions = this.firebaseService.questions,
      this.question = this.firebaseService.question,
      this.totalQuestions = this.questions.length,
      // this.question = this.getQuestion(),
      this.getData()
    );
  }

// ==============================================================
// Get all of the quiz questions     ================================
// ==============================================================

  getData() {
    console.log("question", this.question);
    console.log("Questions", this.questions);
    console.log("totalQuestions", this.totalQuestions);
  }

  getQuestion(): QuizQuestion {
    return this.questions.filter(
      question => question.questionId === this.questionID
    )[0];
  }

// ==============================================================
// Handle all of the quiz questions     =========================
// ==============================================================

  // displayNextQuestion() {

  //   this.questionIndex = this.questionID++;

  //   if (typeof document.getElementById('question') !== 'undefined' && this.getQuestionID() <= this.totalQuestions) {
  //     document.getElementById('question').innerHTML = this.questions[this.questionIndex]['questionText'];
  //   } else {
  //     this.navigateToResults();
  //   }
  // }

  // navigateToNextQuestion(): void {
  //   this.route.navigate(['/question', this.getQuestionID() + 1]);
  //   this.displayNextQuestion();
  // }

  // navigateToResults(): void {
  //   this.route.navigate(['/results'], { state:
  //     {
  //       totalQuestions: this.totalQuestions,
  //       correctAnswersCount: this.correctAnswersCount,
  //       completionTime: this.completionTime,
  //       questions: this.questions
  //     }
  //   });
  // }

// ==============================================================
// Was the question answered right, or no?     ==================
// ==============================================================

  // checkIfAnsweredCorrectly() {
  //   if (this.isThereAnotherQuestion() && this.isCorrectAnswer()) {
  //     this.incrementCorrectAnswersCount();
  //     this.correctAnswer = true;
  //     this.hasAnswer = true;
  //     this.disabled = false;

  //     this.quizDelay(3000);

  //     if (this.getQuestionID() < this.totalQuestions) {
  //       this.navigateToNextQuestion();
  //     } else {
  //       this.navigateToResults();
  //     }
  //   }
  // }

  // incrementCorrectAnswersCount() {
  //   if (this.questionID <= this.totalQuestions && this.isCorrectAnswer()) {
  //     if (this.correctAnswersCount === this.totalQuestions) {
  //       return this.correctAnswersCount;
  //     } else {
  //       this.correctAnswer = true;
  //       this.hasAnswer = true;
  //       return this.correctAnswersCount++;
  //     }
  //   } else {
  //     this.correctAnswer = false;
  //     this.hasAnswer = false;
  //   }
  // }

  /****************  public API from the public ***************/
  // https://stackblitz.com/edit/angular-8-quiz-app?file=src%2Fapp%2Fcontainers%2Fquestion%2Fquestion.component.ts

  // getQuestionID() {
  //   return this.questionID;
  // }

  // setQuestionID(id: number) {
  //   return this.questionID = id;
  // }

  // isThereAnotherQuestion(): boolean {
  //   return this.questionID <= this.questions.length;
  // }

  // isFinalQuestion(): boolean {
  //   return this.currentQuestion === this.totalQuestions;
  // }

  // isCorrectAnswer(): boolean {
  //   return this.question.selectedOption === this.question.answer;
  // }

  // quizDelay(milliseconds) {
  //   const start = new Date().getTime();
  //   let counter = 0;
  //   let end = 0;

  //   while (counter < milliseconds) {
  //     end = new Date().getTime();
  //     counter = end - start;
  //   }
  // }
}
