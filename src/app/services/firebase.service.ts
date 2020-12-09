import { Injectable, Input, Output  } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore"
import { AngularFireAuth } from "@angular/fire/auth"
// import { QuizQuestion } from '../interfaces/QuizQuestion';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private user: any;
  question: any;

  questionID: 6;


  public questions: any[] = [];

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) { 
      this.auth.onAuthStateChanged((user) => {
        if(user) { 
          console.log(user) 
          this.user = user;
        } else {
          console.log("user logged in anon") 
          this.auth.signInAnonymously();
        }
      }); 
    }

  getAllQuestions(): void {
    console.log("getData");
    this.firestore.collection("questions").get().subscribe((querySnapshot) => {
      querySnapshot.forEach((questionData) => {
        // console.log(questionData.id);
        // console.log(questionData.data().question);
        this.questions.push(questionData.data());
      });
      console.log(this.questions);
      this.getQuestion();
    });
  }


  currentQuestion(questionID) {
    return questionID == this.questionID;
  }

  getQuestion() {
    for(var i=0; i<this.questions.length; i++) {
      if(this.questions[i].grade == 6) {
        this.question = this.questions[i];
        // this.question = Object.values(this.questions[i]);

        break;
      }
    }
    // this.question = this.questions.findIndex(this.currentQuestion);
    console.log(this.question);
  }

  // getQuestion(): QuizQuestion {
  //   return this.questions.filter(
  //     question => question.key === this.questionID,
  //     console.log(this.question)
  //   )[0];
  // }

  // getCategorizedQuestions(): void {
  //   console.log("getData");
  //   this.firestore.collection("questions").get().subscribe((querySnapshot) => {
  //     querySnapshot.forEach((questionData) => {
  //       // console.log(questionData.id);
  //       // console.log(questionData.data().question);
  //       this.questions.push(questionData.data());
  //     });
  //     // console.log(this.questions);
  //   });
  // }
}
