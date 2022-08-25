import {Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'
import {catchError, map} from 'rxjs/operators'
import { BaseService } from './bases/base.service';


@Injectable()
export class AdminService extends BaseService{
    prefixo = this.UrlServiceV1 + 'admin/'

    constructor(private http: HttpClient)
    {
        super()
    }

    private url(...x:any[]){
        return this.prefixo + this.ConcatArray('/', x)
    }

    Login(Login: string, Senha: string):Observable<any>{    
        let _user = {Senha: Senha,Login: Login} 
        let response = this.http.post(this.url('login'), _user, this.ObterHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        )
        return response;
    }

    BuscaCep(cep: string):Observable<any>{
        let response = this.http.get(this.url('buscacep', cep), this.ObterHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        )
        return response;
    }

    

}