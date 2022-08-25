import { Component, OnInit } from '@angular/core';
import { BasePage } from '../../../Services/bases/base.page';

@Component({
  selector: 'app-adm-navbar',
  templateUrl: './adm-navbar.component.html'
})
export class AdmNavbarComponent extends BasePage implements OnInit {

  constructor() { super() }

  ngOnInit(): void {
  }

}
