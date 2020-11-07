import {replaceWithTemporal} from "./updateLine.js"
const operators = ['+', '-', '/', '*', '^']

const operatorAndOperands = (line) => (index) => operators.includes(line[index]) && !operators.includes(line[index+1]) && !operators.includes(line[index+2])

const operationInTriple = (TRIPLE, TripleCtx) => (line) => {
    const rplWithTemp = replaceWithTemporal(line)
    const isOperatorAndOperands = operatorAndOperands(line)

    let index = 0, lmxsCount = line.length, tempCount = 1
    let temp = line[2]
    while (lmxsCount > 3 && index < lmxsCount) {
        if (isOperatorAndOperands(index)) {
            // Existencia de variable temporal entre los operandos
            if (line[index+1].indexOf('T') !== -1) {
                temp = line[index+1] 
                TRIPLE.push([line[index], temp, line[index+2]])
                TripleCtx.lineNumber++
            } else {
                temp = `T${tempCount++}`
                TRIPLE.push(['=', temp, line[index+1]])
                TRIPLE.push([line[index], temp, line[index+2]])
                TripleCtx.lineNumber+=2
            }
            rplWithTemp(index, temp)
            lmxsCount-=2
            index = 1
        }
        index++
    }
    // Agrega la asignación
    TRIPLE.push([line[0], line[1], temp])
    TripleCtx.lineNumber++
}

export default operationInTriple