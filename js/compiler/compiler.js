import { linesRegex } from "./variables/regex.js"
import getFunctionTokens from "./tokens/functions.js"
import { countersTk, countErrorsTk } from './variables/globalVariables.js'

const mock = `int asd ( ) {
    fdf = 2 + 4
}
`

/** compile
 * @description Divide un string en lineas para validar con expresiones regulares y obtener los tokens
 * @param {string} code Texto a validar
 * @return {[tokenFile]}  Lista de lexemas en el orden en que se muetra en el texto de entrada
 * @return {[tokens]}  Lista de tokens de lexemas unicos
*/

function compile(code) {
    let tokens = [], tokenFile = ''
    let counters = countersTk, countErrors = countErrorsTk // asignacion a variables let ya que al importarlas, las lee como constantes, y no me deja modificarlas en linea 31
    let lines = code.split(/\n/)
    for(const line in lines) {
        let flag = false
        for(const lineRegex in linesRegex) {
            let text = lines[line].trim()
            const res = linesRegex[lineRegex].exec(text) // Matchea con cada regex de linea
            if (res !== null) {
                flag = true
                switch(lineRegex) {
                    case 'functions':
                        const { tokenListF, countF, fileF, countErrF } = getFunctionTokens(text, counters, countErrors, line)
                        tokens.push(tokenListF)
                        counters, countErrors = countErrF, countF // igualo contadores de tokens para mantener los valores en las siguientes lineas
                        tokenFile += `${fileF}\n`
                        break
                    // case 'operations':
                    //     const { tokenListO, countO, fileO, countErrO } = getOperationTokens(text, counters, countErrors, line)
                    //     tokens.push(tokenListO)
                    //     counters, countErrors = countErrO, countO
                    //     tokenFile += `${fileO}\n`
                    //     break
                    // case 'endFunctions':
                    //     const { tokenListE, countE, fileE, countErrE } = getEndFunctionToken(text, counters, countErrors, line)
                    //     tokens.push(tokenListE)
                    //     counters, countErrors = countErrE, countE
                    //     tokenFile += `${fileE}\n`
                    //     break
                    default:
                        console.log('error') // Falta logica en caso de no coincidir con ningun caso de linea
                }
            }
        }
    }
    console.log(tokens);
    console.log(tokenFile);
    return { tokens, tokenFile }
}
compile(mock)