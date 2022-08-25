import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalStorageUtils } from '../../Uteis/localstorage';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  LocalStorage = new LocalStorageUtils()

  constructor(private readonly router:Router) { }

  ngOnInit(): void {
    this.LocalStorage.LimparSessao()
    if(this.LocalStorage.limparDadosLocaisUsuario())
      this.router.navigate(['/login'])
  }

}
