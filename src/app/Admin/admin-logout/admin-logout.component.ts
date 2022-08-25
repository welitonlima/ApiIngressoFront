import { Router } from '@angular/router';
import { LocalStorageUtils } from './../../Uteis/localstorage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-logout',
  templateUrl: './admin-logout.component.html'
})
export class AdminLogoutComponent implements OnInit {

  LocalStorage = new LocalStorageUtils()

  constructor(private readonly router:Router) { }

  ngOnInit(): void {
    this.LocalStorage.LimparSessao()
    if(this.LocalStorage.limparDadosLocaisUsuario())
      this.router.navigate(['/admin/login'])
  }

}
