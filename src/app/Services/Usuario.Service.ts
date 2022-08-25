import { Usuario } from './../Models/Usuario';
import {Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'
import {catchError, map} from 'rxjs/operators'
import { BaseService } from './bases/base.service';


@Injectable()
export class UsuarioService extends BaseService{
    prefixo = this.UrlServiceV1 + 'usuario/'

    constructor(private http: HttpClient)
    {
        super()
    }

    private url(...x:any[]){
        return this.prefixo + this.ConcatArray('/', x)
    }

    Get(IdUsuario: Number):Observable<any>{
        let response = this.http.get(this.url('get', IdUsuario), this.ObterHeaderAuthJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        )
        return response;
    }

    List(IdEmpresa:Number, Pagina:Number):Observable<any>{
        let response = this.http.get(this.url('list', IdEmpresa, Pagina), this.ObterHeaderAuthJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        )
        return response;
    }

    Insert(dados:Usuario):Observable<any>{
        let response = this.http.post(this.url('insert'), dados, this.ObterHeaderAuthJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        )
        return response;
    }

    Update(dados:Usuario):Observable<any>{
        let response = this.http.post(this.url('update'), dados, this.ObterHeaderAuthJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        )
        return response;
    }

    Remove(IdUsuario:Number):Observable<any>{
        let response = this.http.delete(this.url('remove', IdUsuario), this.ObterHeaderAuthJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        )
        return response;
    }

    Login(Login:string, Senha:string):Observable<any>{
        let response = this.http.post(this.url('login'), { Login,Senha }, this.ObterHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        )
        return response;
    }

}