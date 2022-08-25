import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { LoginService } from './Services/Login.Service'
import { AdminService } from './Services/Admin.Service'
import { EmpresaService } from './Services/Empresa.Service'
import { UsuarioService } from './Services/Usuario.Service'
import { FuncionarioService } from './Services/Funcionario.Service'

import { AdminGuard } from './Services/guards/AdminGuard'
import { UserGuard } from './Services/guards/UserGuard'

import { ToastrModule } from 'ngx-toastr'
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxMaskModule, IConfig } from 'ngx-mask'
const maskConfigFunction: () => Partial<IConfig> = () => {
  return {validation: false,}
}

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AdmLoginComponent } from './Admin/adm-login/adm-login.component'
import { LoginComponent } from './Paginas/login/login.component'
import { AdmPainelComponent } from './Admin/adm-painel/adm-painel.component'
import { EmpresaCadastroComponent } from './Admin/Empresa/empresa-cadastro/empresa-cadastro.component';
import { LogoutComponent } from './Paginas/logout/logout.component';
import { EmpresaUsuariosComponent } from './Admin/Empresa/empresa-usuarios/empresa-usuarios.component';
import { EmpresaUsuariosCadastroComponent } from './Admin/Empresa/empresa-usuarios-cadastro/empresa-usuarios-cadastro.component';
import { MinhaEmpresaComponent } from './Paginas/Empresa/minha-empresa/minha-empresa.component';
import { EmpresaFuncionarioCadastroComponent } from './Paginas/Empresa/empresa-funcionario-cadastro/empresa-funcionario-cadastro.component';
import { ModalConfirmacaoComponent } from './Componentes/modal-confirmacao/modal-confirmacao.component';
import { AdmNavbarComponent } from './Admin/Componentes/adm-navbar/adm-navbar.component';
import { AdminLogoutComponent } from './Admin/admin-logout/admin-logout.component';
import { EmpNavbarComponent } from './Paginas/Componentes/emp-navbar/emp-navbar.component'


@NgModule({
  declarations: [
    AppComponent,
    AdmLoginComponent,
    LoginComponent,
    AdmPainelComponent,
    EmpresaCadastroComponent,
    LogoutComponent,
    EmpresaUsuariosComponent,
    EmpresaUsuariosCadastroComponent,
    MinhaEmpresaComponent,
    EmpresaFuncionarioCadastroComponent,
    ModalConfirmacaoComponent,
    AdmNavbarComponent,
    AdminLogoutComponent,
    EmpNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule,
    ToastrModule.forRoot(), NgxSpinnerModule, NgxMaskModule.forRoot(maskConfigFunction)
  ],
  providers: [AdminGuard, UserGuard, LoginService, AdminService, EmpresaService, UsuarioService, FuncionarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
