import { UsuarioService } from './../../../Services/Usuario.Service';
import { Usuario } from './../../../Models/Usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from '../../../Models/Empresa';
import { BasePage } from '../../../Services/bases/base.page';
import { EmpresaService } from '../../../Services/Empresa.Service';

@Component({
  selector: 'app-empresa-usuarios',
  templateUrl: './empresa-usuarios.component.html'
})
export class EmpresaUsuariosComponent extends BasePage implements OnInit {

  empresa:Empresa = new Empresa()
  usuarios:Usuario[]=[]
  usuario_selecionado = new Usuario()
  IdEmpresa = 0

  //paginação
  pg_preview = true
  pg_next = true
  pg_pagina = 1
  pg_rows_total = 0
  pg_rows_qtd = 5
  pg_qtd_paginas = 1
  pg_paginacao:Number[] = []
  //end paginação

  constructor(private readonly empresaService:EmpresaService,
    private readonly usuarioService:UsuarioService,
    private readonly spinner:NgxSpinnerService,
    private readonly activatedRoute:ActivatedRoute,
    private readonly router:Router,
    private readonly toast:ToastrService) { super() }

  ngOnInit(): void {
    this.IdEmpresa = this.getParam()
    if(this.IdEmpresa > 0){
      this.GetEmpresa(this.IdEmpresa)
      this.ListarUsuarios(this.IdEmpresa)
    } 
    else this.router.navigate(['/admin/painel'])
  }

  getParam() {
    const id = this.activatedRoute.snapshot.queryParams['idEmpresa'];
    if(id > 0) return id
    else return 0
  }

  GetEmpresa(IdEmpresa:Number){    
    this.spinner.show()
    this.empresaService.Get(IdEmpresa)
    .subscribe(
      {
        next: (success) => { 
          this.spinner.hide()
          this.empresa = this.Map(success, new Empresa())
        },
        error: (erro) => this.processarFalha(erro)
      }
    )    
  }

  processarFalha(response:any){
    this.spinner.hide()
    let erro = this.GetServerErros(response)    
    erro.forEach(el => {
      this.toast.error(el)
    })    
  }

  ListarUsuarios(IdEmpresa:Number){
    this.usuarioService.List(IdEmpresa, this.pg_pagina)
    .subscribe(
      {
        next: (success) => { 
          this.spinner.hide()
          this.usuarios = this.ListMap(success, new Usuario())
          if(this.usuarios.length > 0) this.Paginacao_Calcular(this.usuarios[0].TotalRows)
        },
        error: (erro) => this.processarFalha(erro)
      }
    )
  }

  OpenModalExcluirUsuario(x:Usuario){
    this.usuario_selecionado = this.Map(x, new Usuario())
    this.Modal('modalExcluirUsuarioConfirme')
  }

  RespostaModalExcluirUsuario(x:boolean){
    let IdUsuario = this.usuario_selecionado.IdUsuario
    this.usuario_selecionado = new Usuario()
    if(x) this.RemoverUsuario(IdUsuario)
  }

  RemoverUsuario(IdUsuario:Number){
    this.spinner.show()
    this.usuarioService.Remove(IdUsuario)
    .subscribe(
      {
        next: (success) => { 
          this.spinner.hide()
          this.toast.success('Usuário removido!')
          this.ListarUsuarios(this.IdEmpresa)
        },
        error: (erro) => this.processarFalha(erro)
      }
    )
  }

  //paginação Métodos
Paginacao_Calcular(total_rows:Number){
    this.pg_rows_total = Number(total_rows)
    this.pg_paginacao = []
    this.pg_preview = false
    this.pg_next = false

    if(this.pg_rows_total > this.pg_rows_qtd){
      this.pg_qtd_paginas = Math.ceil(this.pg_rows_total / this.pg_rows_qtd)

      if(this.pg_pagina > 1) {
        this.pg_preview = true
        this.pg_paginacao.push(this.pg_pagina - 1)
      }

      this.pg_paginacao.push(this.pg_pagina)

      if(this.pg_qtd_paginas > this.pg_pagina) {
        this.pg_next = true
        this.pg_paginacao.push(this.pg_pagina + 1)
      }
    }
    else if(this.pg_rows_total > 0) this.pg_paginacao.push(this.pg_pagina)
}

  Paginacao_ClassLinkPagination(p:Number){
     return p == this.pg_pagina ? "page-item active" : "page-item"
  }

  Paginacao_Preview(){
    this.pg_pagina = this.pg_pagina - 1
    this.ListarUsuarios(this.IdEmpresa)
  }

  Paginacao_Next(){
    this.pg_pagina = this.pg_pagina + 1
    this.ListarUsuarios(this.IdEmpresa)
  }

  Paginacao_Click(p:Number){
    this.pg_pagina = Number(p)
    this.ListarUsuarios(this.IdEmpresa)
  }

}
