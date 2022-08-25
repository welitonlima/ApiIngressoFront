import { Usuario } from './../../../Models/Usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BasePage } from '../../../Services/bases/base.page';
import { EmpresaService } from '../../../Services/Empresa.Service';
import { UsuarioService } from '../../../Services/Usuario.Service';

@Component({
  selector: 'app-empresa-usuarios-cadastro',
  templateUrl: './empresa-usuarios-cadastro.component.html'
})
export class EmpresaUsuariosCadastroComponent extends BasePage implements OnInit {

  usuario:Usuario = new Usuario()
  novoUsuario = true
  IdEmpresa = 0

  constructor(
    private readonly usuarioService:UsuarioService,
    private readonly spinner:NgxSpinnerService,
    private readonly activatedRoute:ActivatedRoute,
    private readonly router:Router,
    private readonly toast:ToastrService) { super() }

  ngOnInit(): void {
    this.IdEmpresa = this.getParam('idEmpresa')
    let idUsuario = this.getParam('idUsuario')

    if(this.IdEmpresa == 0)
      this.router.navigate(['/admin/painel'])

    this.usuario.IdEmpresa = this.IdEmpresa
    if(idUsuario > 0){
      this.novoUsuario = false
      this.GetUsuario(idUsuario)
    }
  }

  getParam(parametro:string) {
    const id = this.activatedRoute.snapshot.queryParams[parametro];
    if(id > 0) return id
    else return 0
  }

  processarFalha(response:any){
    this.spinner.hide()
    let erro = this.GetServerErros(response)    
    erro.forEach(el => {
      this.toast.error(el)
    })    
  }

  GetUsuario(IdUsuario:Number){    
    this.spinner.show()
    this.usuarioService.Get(IdUsuario)
    .subscribe(
      {
        next: (success) => { 
          this.spinner.hide()
          this.usuario = this.Map(success, new Usuario())
        },
        error: (erro) => this.processarFalha(erro)
      }
    )    
  }

  UsuarioInsert(){
    this.spinner.show()
    this.usuarioService.Insert(this.usuario)
    .subscribe(
      {
        next: (success) => { 
          this.spinner.hide()
          this.PaginaAnterior()
        },
        error: (erro) => this.processarFalha(erro)
      }
    )
  }

  UsuarioUpdate(){
    this.spinner.show()
    this.usuarioService.Update(this.usuario)
    .subscribe(
      {
        next: (success) => { 
          this.spinner.hide()
          this.PaginaAnterior()
        },
        error: (erro) => this.processarFalha(erro)
      }
    )
  }

  Salvar(){
    if(this.novoUsuario) this.UsuarioInsert()
    else this.UsuarioUpdate()
  }

}
