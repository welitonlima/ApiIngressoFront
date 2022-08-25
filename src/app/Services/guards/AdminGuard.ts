import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BaseService } from '../bases/base.service';

@Injectable()
export class AdminGuard extends BaseService implements CanActivate
{
    constructor(private router: Router){
        super()
    }

    canActivate(){
            
        if(!this.LocalStorage.logado() || this.LocalStorage.obterPerfil() != "Adm"){
            this.LocalStorage.limparDadosLocaisUsuario()
            this.router.navigate(['/admin/login'])
        }

        return true;
    }
}