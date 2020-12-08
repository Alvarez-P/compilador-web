/**
 * @description Generates assembly code from a list of triples
 * @param {Array} triple Array that represents a list of triples
 * @returns {Array} Array that represents lines of assembly code
 */
const genAssembly = (triple) => {
    assembly = []
    const OP=0, DO=1, DF=2


    for (const i = 0; i < triple.length; i++){
        const line = []

        OP = triple[i][0], DO = triple[i][1], DF = triple[i][2]
        if(['==', '+', '-'].includes(OP)){
            line.push(OP, DO, DF)
            if(OP)
        }else{
            if(['*', '/', '%']){
                line.push(OP)
            }
        }
        assembly.push(...line)
    }
    return assembly
}

/*CURRENT PROBLEMS
- Avaliable registers
- Extra line generation when mult/div/mod ops occur
- Selection of AL when div
- Selection of AH when mod
- Jump offset
*/

export {
    genAssembly
}