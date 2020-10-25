import conditionalInTriple from "./conditionalInTriple.js"
import iteratorInTriple from "./iteratorInTriple.js"
import operationInTriple from "./operationInTriple.js"

/**
 * @function buildTriple
 * @description Construye el triplo a partir de prefijos
 * @param {Array} lines Lista de bjetos que contiene una lista de lexemas y el tipo de linea
 * @returns {Array} TRIPLE 
 */
const buildTriple = (lines) => {
    const TRIPLE = []
    // Instance builders functions
    const putOperationInTriple = operationInTriple(TRIPLE, lines)
    const putIteratorInTriple = iteratorInTriple(TRIPLE, lines)
    const putConditionalInTriple = conditionalInTriple(TRIPLE, lines)

    lines.forEach(line => {
        if (line.type === 'operation') putOperationInTriple(line.prefixLine)
        else if (line.type === 'iterator') putIteratorInTriple(line.prefixLine)
        else putConditionalInTriple(line.prefixLine)
    })
    return TRIPLE
}

export default buildTriple