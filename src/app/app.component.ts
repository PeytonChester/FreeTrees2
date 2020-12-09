import { Component, OnInit, ViewChild } from '@angular/core';

import { FolderPage } from './folder/folder.page';
import { Plugins } from "@capacitor/core"

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(FolderPage) content: FolderPage;

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/folder/home',
      icon: 'home'
    },
    {
      title: 'About',
      url: '#about',
      icon: 'book'
    },
    {
      title: 'Quizzes by Category',
      url: '/categories',
      icon: 'images'
    },
    {
      title: 'Quizzes by Grade',
      url: '/folder/grades',
      icon: 'library'
    },
    {
      title: 'Login / Sign Up',
      url: '/folder/auth',
      icon: 'person-circle'
    }
  ];
  public labels = [];

  constructor() {
    StatusBar.hide().catch((error) => {
      console.warn(error);
    });
    SplashScreen.hide().catch((error) => {
      console.warn(error);
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  // scrollTo(_id: string) {
  //   let y = document.getElementById("about").offsetTop;
  //   this.content.scrollToPoint(0, y);
  // }
}
