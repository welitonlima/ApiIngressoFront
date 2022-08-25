import { Util } from './../../Uteis/Util'
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { throwError } from "rxjs"
import { LocalStorageUtils } from '../../Uteis/localstorage'

export abstract class BaseService{
    protected UrlServiceV1: string = "http://testes.apinet.targetbr.biz/api/"
    //protected UrlServiceV1: string = "http://localhost:42544/api/"
    public LocalStorage = new LocalStorageUtils();
    public Util = new Util();
    constructor(){}

    protected ObterHeaderJson(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'clnc': '#ClCntrl!'
            })
        }
    }

    protected ObterHeaderAuthJson(type:string = 'application/json'){
        return {
            headers: new HttpHeaders({
                'Content-Type': type,
                'Authorization': 'bearer ' + this.LocalStorage.obterTokenUsuario()
            })
        }
    }

    protected ObterHeaderAuthJsonFile(){
        return {
            headers: new HttpHeaders({
                'enctype': 'multipart/form-data',
                'Authorization': 'bearer ' + this.LocalStorage.obterTokenUsuario()
            })
        }
    }

    protected extractData(response: any){
        if((response != null && response != undefined && response.data != null && response.data != undefined) && !response.data) return false
        return response.data || {}
    }

    protected extractSimple(response: any){
        if(response == null || response == undefined) return false
        return response || {}
    }

    protected serviceError(response: Response | any){
        let customError:string[] = [];
        
        if(response instanceof HttpErrorResponse){
            if(response.statusText === 'Unknown Error'){
                customError.push("Ocorreu um erro desconhecido");
                response.error.errors = customError;
            }
        }        
        
        //return throwError(response)
        return throwError(() => response)
    }

    protected ConcatArray(separator:string, x:any[]){
        let r = ''
        x.forEach(element => {
          if(r != '') r += separator
          r += element
        })
        return r
    }

    GetIdEmpresa(){
        return Number(this.LocalStorage.obterIdEmpresa())
    }
}