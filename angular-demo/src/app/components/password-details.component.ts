import { Component } from '@angular/core';
import { AzkabanService } from '../../services/AzkabanService';
import { Router } from '@angular/router';

@Component({
  templateUrl: './password-details.component.html',
  styleUrls: ['./password-details.component.css']
})
export class PasswordDetails {
  constructor(private router: Router) {}

  ngOnInit() {}
}
