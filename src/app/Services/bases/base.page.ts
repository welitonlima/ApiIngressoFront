import { LocalStorageUtils } from './../../Uteis/localstorage';
import { Util } from './../../Uteis/Util';
import { jsonUtil } from './../../Uteis/jsonUtil';
import {httpErrorVM} from './../../Uteis/httpErrorVM'
import { UntypedFormGroup } from '@angular/forms';

declare function OpenModal(id:any): any
declare function CloseModal(id:any): any
declare function ClearInputById(id:any): any
declare function Mensagem(id:any): any
declare function Redirect(url:any, delay:boolean):any
declare function clickButton(id:any):any
declare function setFocus(id:any):any
declare function SetWindowHeight(id:any):any
declare function voltarPagina():any
declare function TabIndexControl(idDivPrincipal:any, maxIndex:any, idPrimeiroElemento:any):any

export abstract class BasePage
{
    jsonUtil = new jsonUtil()
    Util = new Util()
    localStorage = new LocalStorageUtils()

    constructor(){}

    Map(objJson:any, T:any){
        return this.jsonUtil.Map(objJson,T)
    }

    ListMap(listJson:any[], T:any){
        if(this.Util.IsNull(listJson) || Object.keys(listJson).length == 0) return [] 
        return this.jsonUtil.ListMap(listJson,T)
    }

    IsNullOrEmpty(x:any){
        x = x + ""
        return this.Util.IsNullOrEmpty(x)
    }

    IsValid(x:string){
        return this.Util.IsValid(x)
    }

    Replace(palavra:string, de:string, para:string){
        return this.Util.Replace(palavra, de, para)
    }

    Redirect(url:string, delay:boolean = false){
        Redirect(url, delay)
    }

    ClickByID(id:string){
        clickButton(id)
    }

    Perfil(){
        let x = this.localStorage.obterPerfil()
        if(this.IsValid(x + ''))return Number(x)
        return 0
    }

    SetWindowHeight(idElement:string){
        SetWindowHeight(idElement)
    }

    PaginaAnterior(){
        return voltarPagina()
    }

    GetDateNow(x = ""):string{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear().toString();

        if(x.toLocaleLowerCase() == "dia") return dd
        if(x.toLocaleLowerCase() == "mes") return mm
        if(x.toLocaleLowerCase() == "ano") return yyyy
    
        return dd + '/' + mm + '/' + yyyy;
    }

    SetFocus(id:string){
        setFocus(id)
    }

    TabIndexControl(idDivPrincipal:string, maxIndex:Number, idPrimeiroElemento:string){
        TabIndexControl(idDivPrincipal, maxIndex, idPrimeiroElemento)
    }

    GetIdEmpresa(){
        return this.localStorage.obterIdEmpresa()
    }

    HttpErros(response:any):httpErrorVM{
        let erro:httpErrorVM = new httpErrorVM()
        if(this.Util.IsNull(response)) return erro

        erro.Ok = response.ok
        erro.StatusCode = response.status

        let e = response?.error?.errors
        if(!this.IsNullOrEmpty(e) && typeof(e) == 'string')
        {
            let err:string[]=[]
            err.push(e)
            erro.Errors = err
            erro.CountErrors = err.length
            return erro
        }

        let erros = response?.error?.errors
        if(!this.Util.IsNull(erros)){         
            let err:string[]=[]
            let keys = Object.keys(erros)
            keys.forEach(k => {
                err.push(erros[k])
            });

            erro.Errors = err
            erro.CountErrors = err.length
        }
        else{
            erros = response?.error?.erro
            if(!this.Util.IsNull(erros)){         
                let err:string[]=[]
                err.push(erros)
    
                erro.Errors = err
                erro.CountErrors = err.length
            }
        }

        return erro
    }

    getBase64(file:File) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        });
    }

    Modal(id:string){
        OpenModal(id)
    }

    ModalClose(id:string){
        CloseModal(id)
    }

    Mensagem(msg:string){
        Mensagem(msg)
    }

    Mensagens(msgs:string[]){
        let erros = ''
        msgs.forEach(e => {
            erros += e + '\r\n'
        });
        Mensagem(erros)
    }

    ClearInputById(id:string){
        ClearInputById(id)
    }

    GetServerErros(x:any){
        let erro = []

        if(this.Util.IsNull(x.error) && !this.Util.IsNull(x.message))
        {
            erro.push(x.message)
        }
        else if(!this.Util.IsNull(x.error) && !this.Util.IsNull(x.error.erro))
        {
            erro.push(x.error.erro)
        }
        else if(!this.Util.IsNull(x.error) && x?.error?.errors?.length > 0)
        {
            erro.push(x.error.errors)
        }
        else if(!this.Util.IsNull(x.error.errors)){
            let listPropNames = Object.keys(x.error.errors)
            listPropNames.forEach(element => {
                erro.push(x.error.errors[element][0])
            });
        }

        return erro
    }

    ConvertDateTimeToStringBR(d:Date){    
        let _dataString = ''
        var data = d.toString().split('T')
        if(data.length == 2){
            var dt = data[0].split('-')
            var ti = data[1].split(':')
            if(dt.length == 3 && ti.length >= 3){
                _dataString = dt[2] + '/' + dt[1] + '/' + dt[0]
                _dataString += ' ' + ti[0] + ':' + ti[1]
            }
        }
        return _dataString;
    }

    IconCheck(c:Boolean){
        return c ? 'fa fa-check' : 'fa fa-times'
    }

    String(x:any){
        x = x + ''
        if(this.IsNullOrEmpty(x)) return ''
        return x
    }

    DisplayName(lista:string[], keyNames: string){
        let campos = keyNames.toUpperCase().split(',')
        let nlista:string[] = []
        lista.forEach(el => {
            //obtem o nome do campo seguindo o padrão: "O campo NomeCampo ..."
            let NomeCampo = el.split(' ')[2];
            let indiceNome = campos.indexOf(NomeCampo)
            if(indiceNome > -1)            
              el = el.replace(NomeCampo, campos[indiceNome + 1])          
            nlista.push(el)
        })
        return nlista
    }

    OnChangeHasValue(x:any, nameof:string):boolean{
      return !this.Util.IsNull(x) 
        && !this.Util.IsNull(x[nameof])
        && !this.Util.IsNull(x[nameof]["currentValue"])
    }
    
    OnChangeGetValue(x:any, nameof:string):boolean{
        return x[nameof]["currentValue"]
    }

    paddLeft(num: number, totalLength: number): string {
        return String(num).padStart(totalLength, '0');
    }

    downloadBase64Pdf(base64String:string, fileName:string) {
        const source = `data:application/pdf;base64,${base64String}`;
        const link = document.createElement("a");
        link.href = source;
        link.download = `${fileName}.pdf`
        link.click();
    }

    downloadBase64Docx(base64String:string, fileName:string) {
        const source = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${base64String}`;
        const link = document.createElement("a");
        link.href = source;
        link.download = `${fileName}.docx`
        link.click();
    }
    
    MyName(){
        console.log('Nome: ', this.localStorage.obterUserName())
        return this.localStorage.obterUserName()
    }
}