export class Util{
    public Replace(palavra:string, de:string, para:string):string{
        while(palavra.includes(de))
        {
            palavra = palavra.replace(de,para)
        }
        return palavra
    }

    public IsNumber(x:string):Boolean{
        var reg1 = /^\d{1,}$/
        return reg1.test(x)
    }

    public StringDataToNumber(x:string):number{
        if(x.includes("/")){
            let v = x.split("/")
            if(v.length === 3){
                return Number( (v[2] + v[1] + v[0]) )
            }
        }
        return 0
    }

    public NumberDataToString(x:string):string{        
        if(x.length === 8)
            return x.substring(6,8) + "/" + x.substring(4,6) + "/" + x.substring(0,4)
        
        return ""
    }

    public NumberDataBrToString(x:string):string{     
        if(x.length === 8)
            return x.substring(0,2) + "/" + x.substring(2,4) + "/" + x.substring(4,8)        
        return ""
    }

    public NumberDataBrToDate(x:string):Date{
        return new Date(x.substring(4,8) +'-' + x.substring(2,4) + '-' + x.substring(0,2) + ' 00:00:00')
    }

    public DateToStringBR(x:Date):string{
        let dt = x.toString()
        if(dt.includes('T')) dt = dt.split('T')[0]
        let v = dt.split('-')    
        return v[2] + "/" + v[1] + "/" + v[0]
    }

    public RemoveAcentuacaoToUpper(x:string){
        let a = "Á,Â,Ã,É,Ê,Í,Î,Ó,Ô,Õ,Ú,Û,Ç".split(",");
        let n = "A,A,A,E,E,I,I,O,O,O,U,U,C".split(",");
        x = x.toUpperCase()

        for(let i = 0; i < a.length; i++)
            x = this.Replace(x, a[i], n[i])
        
        return x
    }

    public Trim(x:string)
    {
        while (x.startsWith(" ") && x.length > 1)
            x = x.substring(1)

        return x.trim()
    }

    public IsNullOrEmpty(x:string)
    {
        x = x.toString().replace(" ", "")
        return (x == null || x == undefined || x == '' || x == 'null' || x == 'undefined')
    }

    public IsNull(x:any)
    {
        return (x == null || x == undefined || x == 'null' || x == 'undefined')
    }

    public IsValid(x:string)
    {
        return !this.IsNull(x)
    }

    public IsEmail(x:string):boolean
    {
        var reg1 = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
        return reg1.test(x)
    }

    public ExtOnlyNumber(x:string):string{
        x = x.replace(/\D/g, '')
        return x
    }

    public EmailHide(x:string):string
    {
        if(x.includes('@')){
            let v = x.split('@')
            if(v[0].length > 7){
                let z = v[0].substring(0,2) + '...' + v[0].substring(v[0].length - 3,v[0].length) + '@' + v[1]
                return z
            }
            else {
                let z = v[0].substring(0,2) + '...' + v[0].substring(v[0].length - 1,v[0].length) + '@' + v[1]
                return z
            }
        }

        return x
    }

    public GetSomenteNumeros(x:any):string
    {
        x = !x || x.replace(/\D/g, '')
        return x + ''
    }

    public FormataData(data:string){
        if(!(data).includes('/') && (data + "").length == 8)
            data = data.replace(/^(\d{2})(\d{2})(\d{4}).*/, '$1/$2/$3')

        return data
    }

    public ToDataString(data:any){
        let _data = data + ''
        if(_data.includes('-') && _data.includes('T')){
            let x = _data.split('T')[0].split('-')
            _data = x[2] + '/' + x[1] + '/' + x[0]
        }

        return _data
    }

    public DataGetYear(data:any){
        let _data = data + ''
        if(_data.includes('-') && _data.includes('T')){
            let x = _data.split('T')[0].split('-')
            return Number(x[0])
        }
        return 0
    }

    newDate(dt:string){
        dt = this.FormataData(dt)
        let data = new Date(dt)
        if(dt.includes('/')){
            let d = dt.split('/')
            if(d.length == 3)
                data = new Date(d[2]+'-' + d[1] + '-' + d[0] + ' 00:00:00')        
        }
        return data
    }

    CPF_Blur(x:string){
        if(x.length == 11){
            let blur = x.substring(0,3) + '.***.***-' + x.substring(9,11)
            return blur
        }
        return x
    }

    Mascarar_Celular(x:string){
        if(x.length == 10) return "(" + x.substring(0,2) + ") " + x.substring(2,6) + "-" + x.substring(6,10)
        else if(x.length == 11) return "(" + x.substring(0,2) + ") " + x.substring(3,4) + " " + x.substring(3,7) + "-" + x.substring(7,11)
        else return x
    }

    ValidaDataNumberBr(dataNumber:string){
        if(dataNumber.length != 8) return false;
        let data = this.NumberDataBrToString(dataNumber)
        return this.ValidaDataString(data)
    }

    ValidaDataString(dataString:string){
        var dtArray = dataString.split("/");
        if (dtArray == null)
            return false;

        var dtDay= Number(dtArray[0]);
        var dtMonth = Number(dtArray[1]);
        var dtYear = Number(dtArray[2]);

        if (dtMonth < 1 || dtMonth > 12)
            return false;
        else if (dtDay < 1 || dtDay> 31)
            return false;
        else if ((dtMonth==4 || dtMonth==6 || dtMonth==9 || dtMonth==11) && dtDay ==31)
            return false;
        else if (dtMonth == 2)
        {
            var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
            if (dtDay> 29 || (dtDay ==29 && !isleap))
                return false;
        }

        return true
    }
}