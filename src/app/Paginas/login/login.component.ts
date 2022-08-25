import { LoginRetorno } from './../../Models/LoginRetorno';
import { UsuarioService } from './../../Services/Usuario.Service';
import { Component, OnInit } from '@angular/core';
import { BasePage } from '../../Services/bases/base.page';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent extends BasePage implements OnInit {

  login = ''
  senha = ''

  constructor(private readonly userService:UsuarioService,     
    private readonly spinner:NgxSpinnerService,
    private readonly toast:ToastrService,
    private readonly router:Router) 
  { 
    super() 
  }

  ngOnInit(): void {
  }

  Logar(){
    let v = this.Validacao()
    if(v === ""){
      this.spinner.show()

      this.userService.Login(this.login, this.senha)
      .subscribe(
        {
          next: (success) => this.processarSucesso(success),
          error: (erro) => this.processarFalha(erro)
        }
      )        
    }
    else this.toast.error(v)
  }

  Validacao(){
    if(this.login.length < 3) return 'informe o login'
    if(this.senha.length < 6) return 'informe a senha'
    return ""
  }

  processarSucesso(response:any){
    this.spinner.hide()
    let loginResponse:LoginRetorno =  this.Map(response, new LoginRetorno())
    this.userService.LocalStorage.salvarDadosLocaisUsuario(loginResponse)
    this.router.navigate(['/empresa/minhaempresa'])
  }

  processarFalha(response:any){
    this.spinner.hide()
    let erro = this.GetServerErros(response)    
    erro.forEach(el => {
      this.toast.error(el)
    })    
  }

}
