import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '../app/Services/guards/AdminGuard';
import { UserGuard } from '../app/Services/guards/UserGuard';

import { LoginComponent } from './Paginas/login/login.component'
import { LogoutComponent } from './Paginas/logout/logout.component'
import { AdmLoginComponent } from './Admin/adm-login/adm-login.component'
import { AdminLogoutComponent } from './Admin/admin-logout/admin-logout.component'
import { AdmPainelComponent } from './Admin/adm-painel/adm-painel.component'
import { EmpresaCadastroComponent } from './Admin/Empresa/empresa-cadastro/empresa-cadastro.component'
import { EmpresaUsuariosComponent } from './Admin/Empresa/empresa-usuarios/empresa-usuarios.component'
import { EmpresaUsuariosCadastroComponent } from './Admin/Empresa/empresa-usuarios-cadastro/empresa-usuarios-cadastro.component'
import { MinhaEmpresaComponent } from './Paginas/Empresa/minha-empresa/minha-empresa.component'
import { EmpresaFuncionarioCadastroComponent } from './Paginas/Empresa/empresa-funcionario-cadastro/empresa-funcionario-cadastro.component'

const routes: Routes = [
  {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'admin/login', component: AdmLoginComponent},
  {path: 'admin/logout', component: AdminLogoutComponent},
  {path: 'admin/painel', component: AdmPainelComponent, canActivate:[AdminGuard]},
  {path: 'admin/empresa/cadastro', component: EmpresaCadastroComponent, canActivate:[AdminGuard]},
  {path: 'admin/empresa/usuarios', component: EmpresaUsuariosComponent, canActivate:[AdminGuard]},
  {path: 'admin/empresa/usuario/cadastro', component: EmpresaUsuariosCadastroComponent, canActivate:[AdminGuard]},
  {path: 'empresa/minhaempresa', component: MinhaEmpresaComponent, canActivate:[UserGuard]},
  {path: 'empresa/funcionario/cadastro', component: EmpresaFuncionarioCadastroComponent, canActivate:[UserGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
