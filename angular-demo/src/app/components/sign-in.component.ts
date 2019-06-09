import { Component } from '@angular/core';
import { AzkabanService } from '../../services/AzkabanService';
import { Router } from '@angular/router';

enum SignInState {
  READY,
  IN_PROGRESS,
  SUCCESS,
  ERROR
}

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  title = 'Azkaban - Password Manager';
  username = '';
  password = '';

  SignInState = SignInState;
  state = SignInState.READY;
  error = '';

  constructor(private router: Router) {}

  signIn() {
    this.state = SignInState.IN_PROGRESS;

    AzkabanService.signIn(this.username, this.password)
      .then(() => {
        this.state = SignInState.SUCCESS;
        setTimeout(() => {
          this.router.navigate(['passwords']);
        }, 750);
      })
      .catch(error => {
        this.error = error;
        this.state = SignInState.ERROR;
      });
  }
}
