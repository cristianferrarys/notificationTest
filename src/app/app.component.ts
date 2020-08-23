import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/// PUSH NOTIFI
import { Push, PushObject, PushOptions } from '@ionic-native/push';



import { HomePage } from '../pages/home/home';
import { Pagina2Page } from '../pages/pagina2/pagina2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = Pagina2Page;
  modulo:any ;
  constructor(public platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private push: Push,

  ) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      this.pushLLamado();
    });
   // this.rootPage = Pagina2Page ;

    
    /*
   this.platform.pause.subscribe(() => {
    console.log('pause');
   this.rootPage = HomePage;
   });
   this.platform.resume.subscribe(() => {
    this.rootPage = Pagina2Page;
    console.log('resume');
   });
   */
  }

pushLLamado(){
  const options: PushOptions = {
    android: {
      senderID: '187613377333',
      sound: 'true',
      vibrate: 'true',
      

    },
    ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
    }
 };
 
 const pushObject: PushObject = this.push.init(options);

  pushObject.on('notification').subscribe((notification: any) => {
    console.log('Received a notification');
    console.log( notification);
    ///this.modulo = notification.additionalData.Modulo;
    //this.modulo = notification.additionalData.foreground;
    alert(notification.additionalData.Modulo);
  });
 
  pushObject.on('registration').subscribe((registration: any) => {
    console.log('Device registered', registration);
  });
  pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));


}



}

