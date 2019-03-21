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

  passwords = [];
  isLoadingPasswords = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isLoadingPasswords = true;
    AzkabanService.getPasswords()
      .then(passwords => {
        this.passwords = <any[]>passwords;
        this.isLoadingPasswords = false;
      })
      .catch(error => (this.isLoadingPasswords = false));
  }

  addNewPassword() {
    this.router.navigate(['/password']);
  }

  editExistingPassword(id) {
    this.router.navigate([`/password`, id]);
  }

  copyPasswordToClipboard(id) {
    let passwordToCopy = AzkabanService.getPassword(id);
    AzkabanService.copyToClipboard(passwordToCopy.password);
  }

  deleteExistingPassword(id) {
    AzkabanService.deletePassword(id);
    let passwordToDelete = this.passwords.find(password => password.id);
    let index = this.passwords.indexOf(passwordToDelete);
    this.passwords.splice(index, 1);
  }

  get filteredPasswords() {
    if (!this.passwords) {
      return [];
    }

    if (this.selectedCategory.id !== 0) {
      return this.passwords.filter(
        password => password.category === this.selectedCategory.id
      );
    } else {
      return this.passwords;
    }
  }
}
