import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Settings, AppSettings } from './app.settings';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ChatAdapter } from 'ng-chat';
import { SocketIOAdapter } from './socketio-adapter'
import { Socket } from 'ngx-socket-io';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'app';
  
  userId: string;
  username: string;

  public adapter: ChatAdapter;
   
  public settings: Settings;
  constructor(public appSettings:AppSettings, 
              public router:Router, 
              @Inject(PLATFORM_ID) private platformId: Object,
              public translate: TranslateService,
              private socket: Socket, private http: Http){
    this.settings = this.appSettings.settings;
    translate.addLangs(['en','es']);
    translate.setDefaultLang('es'); 
    translate.use('es');
    // this.InitializeSocketListerners();
  }

  ngAfterViewInit(){ 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {   
        setTimeout(() => {
          if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0,0);
          }
        }); 
      }            
    });    
  }

  // public joinRoom(): void 
  // {
  //   this.socket.emit("join", this.username);
  // }

  // public InitializeSocketListerners(): void
  // {
  //   this.socket.on("generatedUserId", (userId) => {
  //     // Initializing the chat with the userId and the adapter with the socket instance
  //     this.adapter = new SocketIOAdapter(userId, this.socket, this.http);
  //     this.userId = userId;
  //   });
  // }

}
