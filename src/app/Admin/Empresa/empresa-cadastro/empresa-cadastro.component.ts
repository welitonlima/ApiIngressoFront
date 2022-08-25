import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from './../../../Models/Empresa';
import { ViaCep } from './../../../Models/ViaCep';
import { Component, OnInit } from '@angular/core';
import { BasePage } from '../../../Services/bases/base.page';
import { AdminService } from '../../../Services/Admin.Service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from '../../../Services/Empresa.Service';

@Component({
  selector: 'app-empresa-cadastro',
  templateUrl: './empresa-cadastro.component.html'
})
export class EmpresaCadastroComponent extends BasePage implements OnInit {

  empresa:Empresa = new Empresa()
  viacep:ViaCep = new ViaCep()
  novaEmpresa = true
  

  constructor(private readonly empresaService:EmpresaService,
    private readonly adminService:AdminService,
    private readonly spinner:NgxSpinnerService,
    private readonly activatedRoute:ActivatedRoute,
    private readonly router:Router,
    private readonly toast:ToastrService) 
  { super() }

  processarFalha(response:any){
    this.spinner.hide()
    let erro = this.GetServerErros(response)    
    erro.forEach(el => {
      this.toast.error(el)
    })    
  }

  ngOnInit(): void {
    let idEmpresa = this.getParam()
    if(idEmpresa > 0){
      this.novaEmpresa = false
      this.GetEmpresa(idEmpresa)
    }
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

  ChangeCep(){
    if(this.empresa.CEP.length == 8) this.BuscarCep()
  }

  BuscarCep(){
    if(this.empresa.CEP.length == 8){
      this.spinner.show()
      this.adminService.BuscaCep(this.empresa.CEP)
      .subscribe(
        {
          next: (success) => { 
            this.spinner.hide()
            this.BuscarCepSucesso(success)
            
          },
          error: (erro) => this.processarFalha(erro)
        }
      )
    }
    else this.toast.error('Informe o CEP')
  }

  BuscarCepSucesso(x:any){
    this.viacep = this.Map(x, new ViaCep())
    this.empresa.Cidade = ''
    this.empresa.UF = ''
    this.empresa.Bairro = ''
    if(this.viacep != null && this.viacep.cep.length == 9){
      this.empresa.Cidade = this.viacep.localidade
      this.empresa.UF = this.viacep.uf
      this.empresa.Bairro = this.viacep.bairro
      this.empresa.Logradouro = this.viacep.logradouro
    }
    else this.toast.error('CEP não encontrado!')
  }

  EmpresaInsert(){
    this.spinner.show()
    this.empresaService.Insert(this.empresa)
    .subscribe(
      {
        next: (success) => { 
          this.spinner.hide()
          this.router.navigate(['/admin/painel'])
        },
        error: (erro) => this.processarFalha(erro)
      }
    )
  }

  EmpresaUpdate(){
    this.spinner.show()
    this.empresaService.Update(this.empresa)
    .subscribe(
      {
        next: (success) => { 
          this.spinner.hide()
          this.router.navigate(['/admin/painel'])
        },
        error: (erro) => this.processarFalha(erro)
      }
    )
  }

  Salvar(){
    if(this.novaEmpresa) this.EmpresaInsert()
    else this.EmpresaUpdate()
  }

}
