import { Component } from '@angular/core';
import { AzkabanService } from '../../services/AzkabanService';
import { Router } from '@angular/router';

@Component({
  templateUrl: './password-manager.component.html',
  styleUrls: ['./password-manager.component.css']
})
export class PasswordManager {
  categories = AzkabanService.categories;

  selectedCategory = AzkabanService.categories[0];

  passwords = [{ appName: 'Test', appUrl: 'Test', category: 'Test' }];
  isLoadingPasswords = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // this.isLoadingPasswords = true;
    // AzkabanService.getPasswords()
    //   .then(passwords => {
    //     this.passwords = <any[]>passwords;
    //     this.isLoadingPasswords = false;
    //   })
    //   .catch(error => (this.isLoadingPasswords = false));
  }

  addNewPassword() {
    this.router.navigate(['/password']);
  }

  editExistingPassword(id) {
    this.router.navigate([`/password/${id}`]);
  }
}
