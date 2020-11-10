import { matchingTokens } from '../var/regex.js'
import { TokenError } from '../classes/token.js'

function getPriority(op){
    if (op==='(' || op===')') return 1
    else if (op==='&&' || op==='||') return 2
    else if (['>','<','==','<=','>='].includes(op)) return 3
    else if (op==='+' || op==='-') return 4
    else if (op==='%') return 5
    else if (op==='*' || op==='/') return 6
    else if (op==='^') return 7
    else return 0 //asignación
}

/**
 * Dado una lista de tokens, retorna una lista de tales tokens ordenados
 * de acuerdo a notación prefija
 * @param {Array} tokens Lista de tokens a ordenar
 * @returns Lista de tokens en forma prefija
 */
function infixToPrefix(tokens){
    let stack = []
    let prefix = []
    
    for (let i = tokens.length-1; i>=0; i--){
        const token =  tokens[i]
        const lexeme = tokens[i].lexeme

        // No analices tipos de datos
        if (lexeme.match(matchingTokens['TDV'])) continue

        if (lexeme===')') stack.push(token)
        else if (lexeme==='('){
            //Saca todos los operadores de la pila hasta encontrar ')'
            let poppedToken = stack.pop()
            while(poppedToken.lexeme!==')'){
                prefix.push(poppedToken)
                poppedToken = stack.pop()
            }            
        }else if (lexeme.match(matchingTokens['OA']) || lexeme==='='){
            //Símbolo es un operador
            if(stack.length!==0){
                const currPri = getPriority(lexeme)
                let topPri = getPriority(stack[stack.length-1].lexeme)
                //Saca op. de pila hasta que la prioridad del nuevo op.
                //sea menor a la prioridad del op. al final de la pila
                while(stack.length!==0 && currPri < topPri){
                    prefix.push(stack.pop())
                    if (stack.length!==0) topPri = getPriority(stack[stack.length-1].lexeme)
                }
            }
            stack.push(token)
        } else { //Simbolo es un operando
            prefix.push(token)
        }
    }
    while(stack.length!==0) prefix.push(stack.pop())
    return prefix.reverse()
}

/**
 * @description Convierte una lista de expresiones infijas a 
 * expresiones prefijas
 * @param {Array} opLines Arreglo que contiene todos los tokens de
 * todas las líneas catalogadas como de operación
 * @returns {Array} Arreglo que contiene todas las líneas y sus tokens
 * convertidas a notación prefija. Sólo las líneas que no presentan
 * ningún error semántico o sintáctico son convertidas.
 */
function convertLinesToPrefix(lines){
    const prefixLines = []
    for (const line of lines){
        // Trata de forma especial el cierre del while
        if (line.type==='whileEnd'){
            console.log(line)
            prefixLines.push({lexemes:[], type: line.lineType})
            continue
        }
        let error = false
        for(const token of line.tokens){
            //Verifica que no hayan tokens de error en línea
            if (token instanceof TokenError){
                error = true
                break
            }
        }
        // De no haber tokens de error, convierte lexemas a prefijo
        if (!error) prefixLines.push({
            //PrefixLine puede contener tokens si se quita getPrefixLexemes
            prefixLine: getPrefixLexemes(infixToPrefix(line.tokens)),
            type: line.lineType
        })
    }
    return prefixLines
}

/**
 * @description Dado un array de objetos Token, devuelve de forma ordenada
 * los lexemas de estos.
 * @param {Array} line Array de objetos Token
 */
function getPrefixLexemes(line){
    return line.map((token => token.lexeme))
}

export {
    infixToPrefix,
    convertLinesToPrefix,
    getPrefixLexemes
}