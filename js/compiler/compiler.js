import { tokenCounter, errorTokenCounter } from './var/global.js'
import { splitCode } from './split.js'

/**
 * @description Divide un string en lineas para validar con expresiones regulares y obtener los tokens
 * @param {string} code Texto a validar
 * @return {[tokenFile]}  Lista de lexemas en el orden en que se muetra en el texto de entrada
 * @return {[tokens]}  Lista de tokens de lexemas unicos
 */

function compile(code) {
    let tokens = [], errors = [], tokenFile = ''
    let counter = Object.assign({}, tokenCounter)
    let countErrors = Object.assign({}, errorTokenCounter) 

    const { splittedCode, lineTypes } = splitCode(code)
    for (line of splittedCode){
        for (lexem of line){
            //Análisis de cada token dependiendo su tipo de linea

            //Registro de tokens va aquí registerToken(token)
        }
    }
    console.log('Tokens', tokens)
    console.log('Errores', errors)
    return { tokens, errors, tokenFile }
}

export {
    compile
}