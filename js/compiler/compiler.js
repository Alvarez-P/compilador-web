import getFunctionTokens from "./tokens/functions.js"
import { tokenCounter, errorTokenCounter } from './var/global.js'
import getOperationTokens from "./tokens/operations.js"
import getEndFunctionToken from './tokens/endFunctions.js'
import { analizeLine } from './matchers/lineAnalizer.js' 

/** compile
 * @description Divide un string en lineas para validar con expresiones regulares y obtener los tokens
 * @param {string} code Texto a validar
 * @return {[tokenFile]}  Lista de lexemas en el orden en que se muetra en el texto de entrada
 * @return {[tokens]}  Lista de tokens de lexemas unicos
*/

export default function compile(code) {
    let tokens = [], tokenFile = '', errors = []
    let counters = Object.assign({}, tokenCounter), countErrors = Object.assign({}, errorTokenCounter) // asignacion a variables let ya que al importarlas, las lee como constantes, y no me deja modificarlas en linea 31
    let lines = code.split(/\n/)
    for(let line in lines) {
        line = line.trim()
        const lineType = analizeLine(line)
        switch(lineType) {
            case 'function':
                const { tokenListF, countF, fileF, countErrF, errsF } = getFunctionTokens(text, counters, countErrors, line, tokens, errors)
                //tokens.push(...tokenListF)
                counters = countF
                countErrors = countErrF // igualo contadores de tokens para mantener los valores en las siguientes lineas
                tokenFile += `${fileF}\n`
                errors = errsF
                break
            case 'operation':
                const { tokenListO, countO, fileO, countErrO, errsO } = getOperationTokens(text, counters, countErrors, line, tokens, errors)
                //tokens.push(...tokenListO)
                counters = countO
                countErrors = countErrO
                tokenFile += `${fileO}\n`
                errors = errsO
                break
            case 'while':
                break
            case 'delimiter':
                const { tokenListE, countE, fileE, countErrE, errsE } = getEndFunctionToken(text, counters, countErrors, line, tokens, errors)
                //tokens.push(...tokenListE)
                counters = countE
                countErrors = countErrE
                tokenFile += `${fileE}\n`
                errors = errsE
                break
            default:
                console.log('El tipo de línea se desconoce') // Falta logica en caso de no coincidir con ningun caso de linea
        }
    }
    console.log('Tokens', tokens)
    console.log('Errores', errors)
    return { tokens, tokenFile, errors }
}