import { matchingTokens } from './var/regex.js'
import { TokenError } from './classes/token.js'

function getPriority(op){
    if (op==='(' || op===')') return 1
    if (op==='+' || op==='-') return 2
    else if (op==='*' || op==='/') return 3
    else if (op==='^') return 4
    else return 0 //asignación
}

function infixToPrefix(tokens){
    let stack = []
    let prefix = []
    
    for (let i = tokens.length-1; i>=0; i--){
        const token =  tokens[i]
        const lexeme = tokens[i].lexeme

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
            stack.push(token.lexeme)
        } else { //Simbolo es un operando
            prefix.push(token.lexeme)
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

function convertLinesToPrefix(opLines){
    const prefixLines = []
    for (const line of opLines){
        let error = false
        for(const token of line){
            if (token instanceof TokenError){
                error = true
                break
            }
        }
        if (!error) prefixLines.push({ prefixLine: infixToPrefix(line), type: 'operation' })
    }
    return prefixLines
}

export {
    convertLinesToPrefix
}