import { Component } from '@angular/core';
import { AzkabanService } from '../../services/AzkabanService';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './password-details.component.html',
  styleUrls: ['./password-details.component.css']
})
export class PasswordDetails {
  isSaving = false;

  password = {};

  categories = AzkabanService.categories.filter(category => category.id !== 0);

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  save() {
    this.isSaving = true;
    if (this.isNew()) {
      AzkabanService.addPassword(this.password).then(() => {
        this.isSaving = false;
        this.navigateToPasswords();
      });
    } else {
      AzkabanService.updatePassword(this.getId(), this.password).then(() => {
        this.isSaving = true;
        this.navigateToPasswords();
      });
    }
  }

  cancel() {
    this.navigateToPasswords();
  }

  navigateToPasswords() {
    this.router.navigate(['/passwords']);
  }

  getId() {
    return this.route.snapshot.paramMap.get('id');
  }

  isNew() {
    return this.getId() === undefined || this.getId() === null;
  }
}
