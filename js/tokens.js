const errorTk = 'Invalid Token'
const tokensMatch = {
    TD : /^(int|float|boolean|double|char|void)$/,
    ID : /^[a-zA-Z$_]{1,1}[a-zA-Z0-9-_]{0,}$/,
    CNE : /^[0-9]{1,}$/,
    SPACE : /\s/,
    ENTER : /\n/,
    CNPF : /^[0-9]{1,}(\.[0-9]{1,}){0,1}$/,
    DEL : /[\(|\)|\{|\}]/,
    AS : /^=$/,
    SEP : /,/,
    OA : /^[+|\-|*|/|%]$/
}


/** 
 * @description Divide un string en lexemas para validar con expresiones regulares
 * @param {string} code Texto a validar
 * @return {[lexemas]}  Lista de lexemas en el orden en que se muetra en el texto de entrada
 * @return {[tokens]}  Lista de tokens de cada lexema (sin repetirlos)
 */
export function getTokens (code) {
    const contadores = {
        ID: 1,
        TD: 1,
        AS: 1,
        CNE: 1,
        CNPF: 1,
        DEL: 1,
        SEP: 1,
        OA: 1,
        SPACE:1
    }

    let lexemas = code.split(/(\n|\s|\)|,)/)
    lexemas = lex.filter(Boolean)
    let resMatch,
      token,
      tokens = []
      
    for (let lex in lexemas){
        let lexema = lexemas[lex]
        token = null
    
        for (const key in tokensMatch) {
            resMatch = tokensMatch[key].exec(lexema)

            if (resMatch) {          
                token = {
                    lexema: resMatch[0],
                    token: key + contadores[key]
                }
                contadores[key] += 1
            }
        }

        if (token) {
            tokens.push(token)
        } else {
            tokens.push({
                lexema: lexema,
                token: errorTk
            })
        }
    }
    
    let lex = [...new Set(lexemas)]
    return { tokens, lex }
}

/* 
int a () {
a = 1 + 12
}
int a ( char dfs, intsdf) {
a = 1 + 12
}
*/ 