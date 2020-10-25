import replaceWithTemporal from "./replaceWithTemporal.js"
const operators = ['+', '-', '/', '*', '^']

const operationInTriple = (TRIPLE) => (line) => {
    const rplWithTemp = replaceWithTemporal(line)
    let index = 0, lmxsCount = line.length, tempCount = 1
    let temp = line[2]
    while (lmxsCount > 3 && index < lmxsCount) {
        // Operador y dos operandos
        if (operators.includes(line[index]) && 
            !operators.includes(line[index+1]) &&
            !operators.includes(line[index+2])) {
            // Existencia de variable temporal entre los operandos
            if (line[index+1].indexOf('T') !== -1) {
                temp = line[index+1] 
                TRIPLE.push([line[index], temp, line[index+2]])
            }
            else if (line[index+2].indexOf('T') !== -1){
                temp = `T${tempCount++}`
                TRIPLE.push(['=', temp, line[index+1]])
                TRIPLE.push([line[index], temp, line[index+2]])
            } else {
                temp = `T${tempCount++}`
                TRIPLE.push(['=', temp, line[index+1]])
                TRIPLE.push([line[index], temp, line[index+2]])
            }
            rplWithTemp(index, temp)
            lmxsCount-=2
            index = 0
        }
        index++
    }
    // Agrega la asignación
    TRIPLE.push([line[0], line[1], temp])
}

export default operationInTriple