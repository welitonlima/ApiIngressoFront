import { LoginRetorno } from "../Models/LoginRetorno";

export class LocalStorageUtils {

    private prefix = '_t'
    private v_idUsuario = '_Cod'
    private v_codEmpresa = '_K'
    private v_role = '_perfil'
    private myToken(){ return this.prefix + "Tk" }
    private myName(){ return this.prefix + "Nm" }
    private myId() { return this.prefix + "Id" }
    private myType() { return this.prefix + "Type" }
    
    //EMPRESA
    public obterUserName() {
        return JSON.parse(localStorage.getItem(this.myName())+'');
    }

    public obterUserId() {
        let value = this.GetJwt(this.v_idUsuario);
        return Number(value)
    }

    public obterTokenUsuario(): any {
        return localStorage.getItem(this.myToken()) + '';
    }

    public obterPerfil() {
        let value = this.GetJwt(this.v_role);
        if(value === null || value === undefined) return ''
        return value + ''
    }

    public obterIdEmpresa(): any {
        let value = this.GetJwt(this.v_codEmpresa) + '';
        return (value)
        .replace("\"", "")
        .replace("\"", "");
    }

    public salvarDadosLocaisUsuario(response: LoginRetorno) {
        this.salvarTokenUsuario(response.Token + '')
        this.salvarUsuario(response.Nome, response.Id.toString(), response.Papel)
    }

    public limparDadosLocaisUsuario() {        
        localStorage.removeItem(this.myToken())
        localStorage.removeItem(this.myName())
        localStorage.removeItem(this.myId())
        localStorage.removeItem(this.myType())
        return true
    }
    

    public salvarTokenUsuario(token: string) {
        localStorage.setItem(this.myToken(), token)
    }

    public salvarUsuario(userName: string, userId: string, type: string) {
        localStorage.setItem(this.myName(), JSON.stringify(userName))
        localStorage.setItem(this.myId(), JSON.stringify(userId))
        localStorage.setItem(this.myType(), JSON.stringify(type))
    }

    public tokenExpired(token:string){
        if(token === null || token === undefined || token.length < 10) return true
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp
        return ((Math.floor((new Date).getTime() / 1000)) >= expiry)
    }

    public logado(){
        let token = this.obterTokenUsuario()
        let t = this.tokenExpired(token)        
        return t == false
    }

    public GetJwt(value:string){
        let jwt = this.obterTokenUsuario() + ''        
        if(jwt === '') return ''

        let jwtData = jwt.split('.')[1]        
        let decodedJwtJsonData = window.atob(jwtData)
        
        let decodedJwtData = JSON.parse(decodedJwtJsonData)        

        if(value != '') return decodedJwtData[value]

        return decodedJwtData
    }

    public LimparSessao(){
        sessionStorage.clear()
    }

}