import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in.component';
import { PasswordManager } from './components/password-manager.component';
import { PasswordDetails } from './components/password-details.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'passwords', component: PasswordManager },
  { path: 'password', component: PasswordDetails },
  { path: 'password/:id', component: PasswordDetails }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
