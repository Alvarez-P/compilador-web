import { linesRegex } from '../var/regex'

/** analizeLine
 * @description Dada una línea de código, determine de qué tipo es
 * @param {string} code Línea de código a analizar
 * @return {}  Cadena que representa el tipo de línea encontrada. Retorna -1 si no pertenece a ningún tipo.
*/

function analizeLine(line){
    let type = null
    for (key, value in linesRegex){
        const match = value.exec(line)
        if (match){
            type = key
            break
        }
    }
    return type
}

export {
    analizeLine
}