import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(MSAL_GUARD_CONFIG)
    private msalGuardConfig: MsalGuardConfiguration,
    private msalBroadcastService: MsalBroadcastService,
    private msalService: MsalService
  ) { }

  ngOnInit(): void {
    this.msalBroadcastService.inProgress$.pipe();
  }

  // login() {

  //   if (this.msalGuardConfig.authRequest) {
  //     this.msalService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest)
  //   }
  //   else {
  //     this.msalService.loginRedirect()
  //   }
  // }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }



}
