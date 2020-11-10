import endWhile from "./whileEnd.js"
import iteratorInTriple from "./iteratorInTriple.js"
import operationInTriple from "./operationInTriple.js"
import TripleContext from "../classes/triple-context.js"

/**
 * @function buildTriple
 * @description Construye el triplo a partir de prefijos
 * @param {Array} lines Lista de bjetos que contiene una lista de lexemas y el tipo de linea
 * @returns {Array} TRIPLE 
 */
const buildTriple = (lines) => {
    const TRIPLE = []
    const TripleCtx = new TripleContext()
    let trCount = 1
    // Instance builders functions
    const putOperationInTriple = operationInTriple(TRIPLE, TripleCtx)
    const putIteratorInTriple = iteratorInTriple(TRIPLE, TripleCtx, trCount)

    lines.forEach(line => {
        if (line.type === 'operation') putOperationInTriple(line.prefixLine)
        else if (line.type === 'while') putIteratorInTriple(line.prefixLine)
        else endWhile(TRIPLE, TripleCtx)
    })
    return TRIPLE
}

export default buildTriple