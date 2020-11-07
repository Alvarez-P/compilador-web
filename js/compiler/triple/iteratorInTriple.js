import {replaceWithTemporal, deleteLexemes} from "./updateLine.js"

const aritOperators = ['+', '-', '/', '*', '^', '%']
const relOperators = ['==', '>=', '<=', '<', '>', '!=']
const lgcOperators = ['&&', '||']

const relOperatorAndOperands = (line) => (index) => relOperators.includes(line[index]) && !relOperators.includes(line[index+1]) && !relOperators.includes(line[index+2])
const aritOperatorAndOperands = (line) => (index) => aritOperators.includes(line[index]) && !aritOperators.includes(line[index+1]) && !aritOperators.includes(line[index+2])
const notDoubleLgcOperator = (line) => (index) => lgcOperators.includes(line[index]) && !lgcOperators.includes(line[index+1])

const iteratorInTriple = (TRIPLE, TripleCtx, trCount) => (line) => {
    const rplWithTemp = replaceWithTemporal(line)
    const isARelOprAndTwoOprs = relOperatorAndOperands(line)
    const isAAritOprAndTwoOprs = aritOperatorAndOperands(line)
    const isNotDoubleLgcOpr = notDoubleLgcOperator(line)
    let lmxsCount = line.length
    const delLxms = deleteLexemes(line, lmxsCount)

    let index = 0, tempCount = 1
    let temp = '', tr = '', opAnalized = 0, firstCondOfWhile = true
    if (!lgcOperators.includes(line[0])) TripleCtx.logicalOperator = 'without'

    while (index < lmxsCount) {
        if (TripleCtx.logicalOperator) {
            if (firstCondOfWhile) {
                firstCondOfWhile = false
                TripleCtx.addScopeStart(TripleCtx.lineNumber+1)
                TripleCtx.addPendingLineIndex()
            }
            if (isARelOprAndTwoOprs(index)) {
                temp = `T${tempCount}`
                tr = `TR${trCount++}`
                TRIPLE.push(['=', temp, line[index+1]])
                TRIPLE.push([line[index], temp, line[index+2]])
                TripleCtx.lineNumber+=2
                delLxms(index)
                index--

                if (TripleCtx.logicalOperator !== '||') {
                    TRIPLE.push([TripleCtx.lineNumber+3, tr, 'TRUE'])
                    TRIPLE.push([null, tr, 'FALSE'])
                    TripleCtx.lineNumber+=2
                    TripleCtx.addInTheLastPendingLineIndex(TripleCtx.lineNumber - 1)
                    if (opAnalized == 2) {
                        opAnalized = 0
                        TripleCtx.logicalOperator = null
                    }
                }
                else {
                    if (opAnalized == 0) {
                        TRIPLE.push([null, tr, 'TRUE'])
                        TRIPLE.push([TripleCtx.lineNumber+3, tr, 'FALSE'])
                        TripleCtx.lineNumber+=2
                        TripleCtx.addPendingCondLineIndex()
                        TripleCtx.addInTheLastPendingCondLinesIndexes(TripleCtx.lineNumber - 2)
                    }
                    if (opAnalized == 1) {
                        TRIPLE.push([TripleCtx.lineNumber+3, tr, 'TRUE'])
                        TRIPLE.push([null, tr, 'FALSE'])
                        TripleCtx.lineNumber+=2
                        TripleCtx.addInTheLastPendingLineIndex(TripleCtx.lineNumber -1)
                        const pending = TripleCtx.lastPendingCondLinesIndexes
                        TRIPLE[pending][0] = TripleCtx.lineNumber + 1
                    }
                }
                opAnalized++
            }
            else if (isAAritOprAndTwoOprs(index)) {
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
        }
        else if (isNotDoubleLgcOpr(index)) {
            TripleCtx.logicalOperator = line.splice(index, 1)[0]
            index = -1
            lmxsCount--
        }
        index++
    }
}

export default iteratorInTriple