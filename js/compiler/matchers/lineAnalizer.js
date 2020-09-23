import { linesRegex } from '../var/regex.js'

/** analizeLine
 * @description Dada una línea de código, determine de qué tipo es
 * @param {string} code Línea de código a analizar
 * @return {string} Cadena que representa el tipo de línea encontrada. Retorna null si no pertenece a ningún tipo.
*/

function analizeLine(line){
    let type = null
    for (const key in linesRegex){
        const match = linesRegex[key].exec(line)
        //console.log(match)
        if (match){
            type = key
            break
        }
    }
    return type
}

function otraFuncion(){
    
}

export {
    analizeLine
}