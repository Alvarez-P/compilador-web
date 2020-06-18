import { linesRegex } from "./variables/regex.js"
import getFunctionTokens from "./tokens/functions.js"
import { countersTk, countErrorsTk } from './variables/globalVariables.js'
import getOperationTokens from "./tokens/operations.js"
import getEndFunctionToken from './tokens/endFunctions.js' 

/** compile
 * @description Divide un string en lineas para validar con expresiones regulares y obtener los tokens
 * @param {string} code Texto a validar
 * @return {[tokenFile]}  Lista de lexemas en el orden en que se muetra en el texto de entrada
 * @return {[tokens]}  Lista de tokens de lexemas unicos
*/

export default function compile(code) {
    let tokens = [], tokenFile = '', errors = []
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
                        const { tokenListF, countF, fileF, countErrF, errsF } = getFunctionTokens(text, counters, countErrors, line, errors)
                        tokens.push(tokenListF)
                        counters = countF
                        countErrors = countErrF // igualo contadores de tokens para mantener los valores en las siguientes lineas
                        tokenFile += `${fileF}\n`
                        errors = errsF
                        break
                    case 'operations':
                        const { tokenListO, countO, fileO, countErrO, errsO } = getOperationTokens(text, counters, countErrors, line, errors)
                        tokens.push(tokenListO)
                        counters = countO
                        countErrors = countErrO
                        tokenFile += `${fileO}\n`
                        errors = errsO
                        break
                    case 'endFunctions':
                        const { tokenListE, countE, fileE, countErrE, errsE } = getEndFunctionToken(text, counters, countErrors, line, errors)
                        tokens.push(tokenListE)
                        counters = countE
                        countErrors = countErrE
                        tokenFile += `${fileE}\n`
                        errors = errsE
                        break
                    default:
                        console.log('error') // Falta logica en caso de no coincidir con ningun caso de linea
                }
            }
        }
    }
    console.log(tokens)
    console.log(errors)
    return { tokens, tokenFile, errors }
}