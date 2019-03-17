import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in.component';
import { PasswordManager } from './components/password-manager.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'passwords', component: PasswordManager }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
