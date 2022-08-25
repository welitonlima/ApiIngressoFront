import { Empresa } from './../Models/Empresa';
import {Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'
import {catchError, map} from 'rxjs/operators'
import { BaseService } from './bases/base.service';


@Injectable()
export class EmpresaService extends BaseService{
    prefixo = this.UrlServiceV1 + 'empresa/'

    constructor(private http: HttpClient)
    {
        super()
    }

    private url(...x:any[]){
        return this.prefixo + this.ConcatArray('/', x)
    }

    Get(IdEmpresa: Number):Observable<any>{
        let response = this.http.get(this.url('get', IdEmpresa), this.ObterHeaderAuthJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        )
        return response;
    }

    List(Pagina:Number):Observable<any>{
        let response = this.http.get(this.url('list', Pagina), this.ObterHeaderAuthJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        )
        return response;
    }

    Insert(empresa:Empresa):Observable<any>{
        let response = this.http.post(this.url('insert'), empresa, this.ObterHeaderAuthJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        )
        return response;
    }

    Update(empresa:Empresa):Observable<any>{
        let response = this.http.post(this.url('update'), empresa, this.ObterHeaderAuthJson())
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