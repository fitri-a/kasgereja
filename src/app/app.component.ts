import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController, IonRouterOutlet } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet?: IonRouterOutlet;
  private lastTimeBackPress = 0;
  private timePeriodToExit = 2000;

  constructor(
    private platform: Platform,
    private toastController: ToastController,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(10, async (processNextHandler) => {
        if (!this.routerOutlet?.canGoBack() || this.router.url === '/home' || this.router.url === '/login') {
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
            App.exitApp();
          } else {
            this.showToast();
            this.lastTimeBackPress = new Date().getTime();
          }
        } else {
          processNextHandler();
        }
      });
    });
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: 'Ketuk sekali lagi untuk keluar',
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
