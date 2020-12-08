/**
 * @description Generates assembly code from a list of triples
 * @param {Array} triple Array that represents a list of triples
 * @returns {Array} Array that represents lines of assembly code
 */
const genAssembly = (triple) => {
    const assembly = []
    //Permiten generar operadores de salto
    const relOps2jumpOps = {'==':'EQ', '!=':'NE', '>':'JG', '>=':'JGE', '<':'JL', '<=':'JLE'}
    let relationalOP = null
    //Permiten ajustar los renglones a donde se va a saltar
    const jumpLines = []
    const lineInsertions = []
    for (let i = 0; i < triple.length; i++){
        const lines = []
        //Preprocesa datos del triplo
        let OP = triple[i][0]
        let DO = pickRegister(triple[i][1])
        let DF = pickRegister(triple[i][2])
        //Genera lineas de ensamblador
        if (['=', '+', '-'].includes(OP)){
            if(OP=='=') lines.push(['MOV', DO, DF])
            if(OP=='+') lines.push(['ADD', DO, DF])
            if(OP=='-') lines.push(['SUB', DO, DF])
        }else if (OP==='*'){
            lines.push(['MOV', 'AL', DO])//Multiplicando
            lines.push(['MOV', 'BL', DF], ['MUL', DF])//Multiplicador
            lines.push(['MOV', DO, 'AX'])//Resultado al registro original
        }else if (['/', '%'].includes(OP)){
            lines.push(['MOV', 'AX', DO])//Dividendo
            lines.push(['MOV', 'BL', DF], ['DIV', DF])//Divisor
            const res = (OP==='/')?'AL':'AH'
            lines.push(['MOV', DO, res])//Resultado al registro original
        }else if (['==','!=','>','>=','<','<='].includes(OP)){
            lines.push(['CMP', DO, DF])
            relationalOP = OP
        }else if(OP==='JR'){//Saltos incondicionados (JR)
            lines.push(['JMP', `RENGLON${DF}`])
            //Almacena renglón de salto
            jumpLines.push({DF: `RENGLON${DF}`})
        }else{//Saltos condicionados (TRX)
            let jumpOP = null
            if (relationalOP){
                jumpOP = relOps2jumpOps[relationalOP]
                relationalOP = null
            }else jumpOP = 'JMP'
            lines.push([jumpOP, `RENGLON${OP}`])
            //Almacena renglón de salto
            jumpLines.push({OP: `RENGLON${OP}`})
        }
        assembly.push(...lines)

        console.log(OP, DO, DF)
        console.log(assembly)
    }

    //Inserta etiquetas
    //Calcula offset
    //Usa new locations to access jump lines/labels and change them
    return assembly
}

const pickRegister = (arg) => {
    if(arg=='T1') return 'BH'
    if(arg=='T2') return 'CH'
    if(arg=='T3') return 'DH'
    return arg
}

export {
    genAssembly
}