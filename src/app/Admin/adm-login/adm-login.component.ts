import { LoginRetorno } from './../../Models/LoginRetorno';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core'
import { AdminService } from '../../Services/Admin.Service'
import { BasePage } from '../../Services/bases/base.page'
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adm-login',
  templateUrl: './adm-login.component.html'
})
export class AdmLoginComponent extends BasePage implements OnInit {

  login = ''
  senha = ''

  constructor(private readonly admService:AdminService, 
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

        this.admService.Login(this.login, this.senha)
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
    let loginResponse:LoginRetorno =  this.Map(response, new LoginRetorno())
    this.admService.LocalStorage.salvarDadosLocaisUsuario(loginResponse)
    this.router.navigate(['/admin/painel'])
  }

  processarFalha(response:any){
    this.spinner.hide()
    let erro = this.GetServerErros(response)    
    erro.forEach(el => {
      this.toast.error(el)
    })    
  }

}
