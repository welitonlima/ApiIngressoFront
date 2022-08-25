import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from './../../../Models/Empresa';
import { Funcionario } from './../../../Models/Funcionario';
import { FuncionarioService } from './../../../Services/Funcionario.Service';
import { Component, OnInit } from '@angular/core';
import { BasePage } from '../../../Services/bases/base.page';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-empresa-funcionario-cadastro',
  templateUrl: './empresa-funcionario-cadastro.component.html'
})
export class EmpresaFuncionarioCadastroComponent extends BasePage implements OnInit {

  minhaEmpresa:Empresa = new Empresa()
  funcionario:Funcionario = new Funcionario()
  novaFuncionario = true
  IdFuncionario = 0
  IdEmpresa = 0

  constructor(
    private readonly funcionarioService:FuncionarioService,
    private readonly activatedRoute:ActivatedRoute,
    private readonly spinner:NgxSpinnerService,
    private readonly router:Router,
    private readonly toast:ToastrService) 
    { 
      super() 
    }

  ngOnInit(): void {
    this.IdFuncionario = this.getParam()
    this.IdEmpresa = this.GetIdEmpresa()
    this.funcionario.IdEmpresa = this.IdEmpresa
    if(this.IdFuncionario > 0){
      this.novaFuncionario = false
      this.GetFuncionario()
    }
  }

  processarFalha(response:any){
    this.spinner.hide()
    let erro = this.GetServerErros(response)    
    erro.forEach(el => {
      this.toast.error(el)
    })    
  }

  getParam() {
    const id = this.activatedRoute.snapshot.queryParams['idFuncionario'];
    if(id > 0) return id
    else return 0
  }

  GetFuncionario(){    
    this.spinner.show()
    this.funcionarioService.Get(this.IdFuncionario)
    .subscribe(
      {
        next: (success) => {
          this.spinner.hide()
          this.funcionario = this.Map(success, new Funcionario())
        },
        error: (erro) => this.processarFalha(erro)
      }
    )    
  }

  EmpresaInsert(){
    this.spinner.show()
    this.funcionarioService.Insert(this.funcionario)
    .subscribe(
      {
        next: (success) => { 
          this.spinner.hide()
          this.router.navigate(['/empresa/minhaempresa'])
        },
        error: (erro) => this.processarFalha(erro)
      }
    )
  }

  EmpresaUpdate(){
    this.spinner.show()
    this.funcionarioService.Update(this.funcionario)
    .subscribe(
      {
        next: (success) => { 
          this.spinner.hide()
          this.router.navigate(['/empresa/minhaempresa'])
        },
        error: (erro) => this.processarFalha(erro)
      }
    )
  }

  Salvar(){
    if(this.novaFuncionario) this.EmpresaInsert()
    else this.EmpresaUpdate()
  }

}
