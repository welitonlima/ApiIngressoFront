import { Funcionario } from './../Models/Funcionario';
import {Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'
import {catchError, map} from 'rxjs/operators'
import { BaseService } from './bases/base.service';


@Injectable()
export class FuncionarioService extends BaseService{
    prefixo = this.UrlServiceV1 + 'funcionario/'

    constructor(private http: HttpClient)
    {
        super()
    }

    private url(...x:any[]){
        return this.prefixo + this.ConcatArray('/', x)
    }

    Get(IdFuncionario: Number):Observable<any>{
        let response = this.http.get(this.url('get', IdFuncionario), this.ObterHeaderAuthJson())
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

    Insert(dados:Funcionario):Observable<any>{
        let response = this.http.post(this.url('insert'), dados, this.ObterHeaderAuthJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        )
        return response;
    }

    Update(dados:Funcionario):Observable<any>{
        let response = this.http.post(this.url('update'), dados, this.ObterHeaderAuthJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        )
        return response;
    }

    Remove(IdEmpresa:Number):Observable<any>{
        let response = this.http.delete(this.url('remove', IdEmpresa), this.ObterHeaderAuthJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        )
        return response;
    }

    

}