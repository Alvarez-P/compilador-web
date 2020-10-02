import { analizeLine } from './matchers/lineAnalizer.js' 

/**
 * @description Dado un fragmento de código, devuelve los lexemas
 * y tipo de líneas encontradas en el código
 * @param {String} code Una cadena multilínea representando un frag. de código
 * @returns {Array[Array], Array} Retorna dos cosas: '', que es un array de arrays
 * representando los lexemas encontrados, y 'lineTypes', un array que indica los
 *  tipos de líneas encontradas
 */

function splitCode(code){
    let splittedCode = [], lineTypes = []
    let lines = code.split(/\n/)
    for (let line of lines){
        //Ignora lineas vacias (Hace falta un mejor patrón)
        if (line==='') continue
        //Limpia linea
        line.trim()
        while(line.search('\t')!==-1) line = line.replace(/\t/, '')
        //Define tipo de línea
        const lineType = analizeLine(line)
        if (!lineType) throw ('Se desconoce el tipo de línea')
        lineTypes.push(lineType)
        //Consigue lexemas
        const lexemes = splitLine(line)
        splittedCode.push(lexemes)
    }
    return { splittedCode, lineTypes }
}

/** 
 * @description Dada una línea de código, la separa de manera
 * que devuelve un array con todos los lexemas encontrados
 * @param {String} line Línea de código a separar
 * @returns {Array} Lexemas encontrados
 */

function splitLine(line){
    const matches = line.split(/(\s|\(|\)|\,)/)
    const lexemas = matches.filter(lexema => (lexema!=='' && lexema!==' ' ))
    return lexemas
}

export {
    splitCode
}
