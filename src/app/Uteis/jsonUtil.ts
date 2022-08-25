interface Header{Name:string}

export class jsonUtil{    

    Map(objJson:any, T:any):any{
        let x:any = {}

        /* obtem os nomes das propriedades do Model desejado */
        const headers: Header[] = Object.keys(T).map(key => {
            return {Name: key}
        });
        
        /* recria o json simples colocando os nomes das propriedades em minúsculo
           para poder fazer o Map */
        objJson = this.FormatJsonToMinPropertiesName(objJson)
        for(let h of headers){
            let type = typeof T[h.Name];
            let valueDefault = T[h.Name]
            let value = this.GetValue(objJson, h.Name.toLowerCase(), type, valueDefault)
            if(value === 'null') value = null

            x[h.Name] = value
        }

        return x
    }    

    ListMap(listJson:any[], T:any):any[]{
        let listaMap:any = []
        listJson.forEach(element => {
            listaMap.push(
                this.Map(element, T)
            )
        });

        return listaMap
    }
    //#region método privados

    private GetValue(objJson:any, propName:string, typeField:string, valueDefault:any){
        let v = objJson[propName]

        let _undefined = (v === undefined || v === NaN || v === null)
        typeField = typeField.toLowerCase()

        if(!_undefined && typeField === 'number')
            return this.NumberConvert(v+'')
        else if(!_undefined && typeField === 'string')
            return v + ''
        else if(!_undefined && typeField === 'boolean')
            return v
        else if(_undefined)
            return valueDefault

        if(propName.toLocaleLowerCase() === "ischeck") console.log(v)

        return v
    }

    private NumberConvert(n:string){
        if(n.includes('.') || n.includes(','))
            return this.decimalWork(n)        
        else 
            return Number(n)        
    }

    private decimalWork(anything:string) 
    {
        var reg1 = /(\.|\,)\d{1,}$/
        let a = anything.match(reg1)

        if(a != null){
            let x2 = a[0].replace(",",".")

            let x1 = anything.replace(reg1, '')
            x1 = this.replaceAll(x1, '.', '')
            x1 = this.replaceAll(x1, ',', '')
            x1 = x1 + x2

            return Number(x1)
        }
        
        return Number(anything)
    }

    private replaceAll(word:string, x:string, y:string){
        if(x == y) return word
        while(word.includes(x)){
            word = word.replace(x, y)
        }
        return word
    }

    
    private GetJsonPropertiesName(obj:any) {
        /*Obtem os nomes das propriedades do objeto json*/
        var cols = new Array();
        for (var key in obj) {
            cols.push(key);
        }
        return cols;
    }

    private FormatJsonToMinPropertiesName(obj:any) {
        /*Obtem os nomes das propriedades do objeto json*/
        var cols = this.GetJsonPropertiesName(obj)        

        /*Recria o objeto com o nome das propriedades em minúsculo*/
        let nObj: any = {}
        for(let c of cols){
            nObj[(c + '').toLowerCase()] = obj[c]
        }

        return nObj;
    }
    //#endregion
}