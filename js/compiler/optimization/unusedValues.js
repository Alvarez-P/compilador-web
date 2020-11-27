/**
 * @function deleteUnusedValues
 * @description Elimina las lineas de las variables que no se usaron
 * @param {*} tokensLines 
 */
export const deleteUnusedValues = (tokensLines) => (variablesLines) => {
    let operators = new Set()
    let pendings = []
    for (const variablesLine of variablesLines)  {
        if (variablesLine.value) {
            if (operators.has(variablesLine.value)) {
                variablesLine.operators.forEach(operator => operators.add(operator))
            }
            else {
                if(!variablesLine.inWhile && pendings.length !== 0) {
                    pendings.forEach(pending => {
                        if (!operators.has(pending.value)) {
                            tokensLines.splice(pending.line, 1)
                        }
                    })
                    pendings = []
                }
                if (variablesLine.inWhile) {
                    pendings.push(variablesLine)
                    variablesLine.operators.forEach(operator => operators.add(operator))
                }
                else if (pendings.length === 0) {
                    tokensLines.splice(variablesLine.line, 1)
                }
            }
        } else variablesLine.operators.forEach(operator => operators.add(operator))
    }
}
