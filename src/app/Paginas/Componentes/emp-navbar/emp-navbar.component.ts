import { Component, OnInit } from '@angular/core';
import { BasePage } from '../../../Services/bases/base.page';

@Component({
  selector: 'app-emp-navbar',
  templateUrl: './emp-navbar.component.html'
})
export class EmpNavbarComponent extends BasePage implements OnInit {

  constructor() { super() }

  ngOnInit(): void {
  }

}
