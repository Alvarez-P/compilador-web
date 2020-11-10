import {replaceWithTemporal} from "./updateLine.js"
const operators = ['+', '-', '/', '*', '^']

const operatorAndOperands = (line) => (index) => operators.includes(line[index]) && !operators.includes(line[index+1]) && !operators.includes(line[index+2])

const operationInTriple = (TRIPLE, TripleCtx) => (line) => {
    let index = 0, lxmsCount = line.length, tempCount = 1
    let temp = line[2]
    const rplWithTemp = replaceWithTemporal(line, lxmsCount)
    const isOperatorAndOperands = operatorAndOperands(line)

    while (lxmsCount > 3 && index < lxmsCount) {
        if (isOperatorAndOperands(index)) {
            // Existencia de variable temporal entre los operandos
            let secondOperand = line[index+2], secondTemp = ''
            if (isNaN(secondOperand) && secondOperand.indexOf('T') !== 0) {
                secondTemp = `T${tempCount++}`
                TRIPLE.push(['=', secondTemp, secondOperand])
                secondOperand = secondTemp
                TripleCtx.lineNumber++
            }
            if (line[index+1].indexOf('T') !== -1) {
                temp = line[index+1] 
                TRIPLE.push([line[index], temp, secondOperand])
                TripleCtx.lineNumber++
            } else {
                temp = `T${tempCount++}`
                TRIPLE.push(['=', temp, line[index+1]])
                TRIPLE.push([line[index], temp, secondOperand])
                TripleCtx.lineNumber+=2
            }
            rplWithTemp(index, temp)
            index = 1
        }
        index++
    }
    // Agrega la asignación
    TRIPLE.push([line[0], line[1], temp])
    TripleCtx.lineNumber++
}

export default operationInTriple