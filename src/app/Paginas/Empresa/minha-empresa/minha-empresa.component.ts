import { FuncionarioService } from './../../../Services/Funcionario.Service'
import { Funcionario } from './../../../Models/Funcionario'
import { Component, OnInit } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr'
import { Empresa } from '../../../Models/Empresa'
import { BasePage } from '../../../Services/bases/base.page'
import { EmpresaService } from '../../../Services/Empresa.Service'

@Component({
  selector: 'app-minha-empresa',
  templateUrl: './minha-empresa.component.html'
})
export class MinhaEmpresaComponent extends BasePage implements OnInit {

  minhaEmpresa:Empresa = new Empresa()
  funcionarios:Funcionario[] = []
  funcionario_selecionado:Funcionario = new Funcionario()

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
    private readonly funcionarioService:FuncionarioService,     
    private readonly spinner:NgxSpinnerService,
    private readonly toast:ToastrService) 
    { 
      super() 
    }

  ngOnInit(): void {
    this.GetMinhaEmpresa()
    this.ListarFuncionarios()
  }

  processarFalha(response:any){
    this.spinner.hide()
    let erro = this.GetServerErros(response)    
    erro.forEach(el => {
      this.toast.error(el)
    })    
  }

  GetMinhaEmpresa(){
    this.spinner.show()
    this.empresaService.Get(this.GetIdEmpresa())
    .subscribe(
      {
        next: (success) => { 
          this.spinner.hide()
          this.minhaEmpresa = this.Map(success, new Empresa())
        },
        error: (erro) => this.processarFalha(erro)
      }
    )
  }

  ListarFuncionarios(){
    this.spinner.show()
    this.funcionarioService.List(this.GetIdEmpresa(), this.pg_pagina)
    .subscribe(
      {
        next: (success) => { 
          this.spinner.hide()
          this.funcionarios = this.ListMap(success, new Funcionario())
          if(this.funcionarios.length > 0)
            this.Paginacao_Calcular(this.funcionarios[0].TotalRows)
        },
        error: (erro) => this.processarFalha(erro)
      }
    )
  }

  OpenModalExcluirFuncionario(x:Funcionario){
    this.funcionario_selecionado = this.Map(x, new Funcionario())
    this.Modal('modalExcluirFuncionarioConfirme')
  }

  RespostaModalExcluirFuncionario(x:boolean){
    let IdFuncionario = this.funcionario_selecionado.IdFuncionario
    this.funcionario_selecionado = new Funcionario()
    if(x) this.RemoverFuncionario(IdFuncionario)    
  }

  RemoverFuncionario(IdFuncionario:Number){
    this.spinner.show()
    this.funcionarioService.Remove(IdFuncionario)
    .subscribe(
      {
        next: (success) => { 
          this.spinner.hide()
          this.toast.success('Funcionário removido!')
          this.ListarFuncionarios()
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
    this.ListarFuncionarios()
  }

  Paginacao_Next(){
    this.pg_pagina = this.pg_pagina + 1
    this.ListarFuncionarios()
  }

  Paginacao_Click(p:Number){
    this.pg_pagina = Number(p)
    this.ListarFuncionarios()
  }

}
