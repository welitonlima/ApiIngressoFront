import { Empresa } from './../../Models/Empresa';
import { EmpresaService } from './../../Services/Empresa.Service';
import { Component, OnInit } from '@angular/core';
import { BasePage } from '../../Services/bases/base.page';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adm-painel',
  templateUrl: './adm-painel.component.html'
})
export class AdmPainelComponent extends BasePage implements OnInit {
  empresas:Empresa[] = []
  empresa_selecionada = new Empresa()

  // o valor da variável pg_rows_qtd é definida no backend, seu valor deve ser igual
  //paginação
  pg_preview = true
  pg_next = true
  pg_pagina = 1
  pg_rows_total = 0
  pg_rows_qtd = 5
  pg_qtd_paginas = 1
  pg_paginacao:Number[] = []
  //end paginação

  constructor(
    private readonly empresaService:EmpresaService,
    private readonly spinner:NgxSpinnerService,    
    private readonly toast:ToastrService,
    ) 
  { 
    super() 
  }

  ngOnInit(): void {
    this.ListEmpresas()
  }

  ListEmpresas(){
    this.spinner.show()
    this.empresaService.List(this.pg_pagina)
    .subscribe(
      {
        next: (success) => this.processarSucesso(success),
        error: (erro) => this.processarFalha(erro)
      }
    )  
  }

  processarSucesso(response:any){
    this.spinner.hide()
    this.empresas = this.ListMap(response, new Empresa())
    if(this.empresas.length > 0) 
      this.Paginacao_Calcular(this.empresas[0].TotalRows)
  }

  processarFalha(response:any){
    this.spinner.hide()
    let erro = this.GetServerErros(response)    
    erro.forEach(el => {
      this.toast.error(el)
    })    
  }

  OpenModalExcluirEmpresa(x:Empresa){
    this.empresa_selecionada = this.Map(x, new Empresa())
    this.Modal('modalExcluirEmpresaConfirme')
  }

  RespostaModalExcluirEmpresa(x:boolean){
    let IdEmpresa = this.empresa_selecionada.IdEmpresa
    this.empresa_selecionada = new Empresa()
    if(x) this.RemoverEmpresa(IdEmpresa)    
  }

  RemoverEmpresa(IdEmpresa:Number){
    this.spinner.show()
    this.empresaService.Remove(IdEmpresa)
    .subscribe(
      {
        next: (success) => { 
          this.spinner.hide()
          this.toast.success('Empresa removida!')
          this.ListEmpresas()
        },
        error: (erro) => this.processarFalha(erro)
      }
    )
  }

  //paginação
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
    this.ListEmpresas()
  }

  Paginacao_Next(){
    this.pg_pagina = this.pg_pagina + 1
    this.ListEmpresas()
  }

  Paginacao_Click(p:Number){
    this.pg_pagina = Number(p)
    this.ListEmpresas()
  }

}
