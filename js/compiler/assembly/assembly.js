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
    //Permiten ajustar las etiquetas y renglones de salto
    let jumps = {}
    const lineInsertions = {}
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
            lines.push(['MOV', 'BL', DF], ['MUL', 'BL'])//Multiplicador
            lines.push(['MOV', DO, 'AX'])//Resultado al registro original
            lineInsertions[i+1] = 3
        }else if (['/', '%'].includes(OP)){
            lines.push(['MOV', 'AX', DO])//Dividendo
            lines.push(['MOV', 'BL', DF], ['DIV', 'BL'])//Divisor
            const res = (OP==='/')?'AL':'AH'
            lines.push(['MOV', DO, res])//Resultado al registro original
            lineInsertions[i+1] = 3
        }else if (['==','!=','>','>=','<','<='].includes(OP)){
            lines.push(['CMP', DO, DF])
            relationalOP = OP
        }else if(OP==='JR'){//Saltos incondicionados (JR)
            lines.push(['JMP', `RENGLON${DF}`])
            //Almacena renglón de salto
            updateJumps(jumps, parseInt(DF), assembly.length+1)
        }else{//Saltos condicionados (TRX)
            let jumpOP = null
            if (relationalOP){
                jumpOP = relOps2jumpOps[relationalOP]
                relationalOP = null
            }else jumpOP = 'JMP'
            lines.push([jumpOP, `RENGLON${OP}`])
            //Almacena renglón de salto
            updateJumps(jumps, parseInt(OP), assembly.length+1)
        }
        assembly.push(...lines)
    }

    //Corrige e inserta etiquetas
    const labelLines = Object.keys(jumps)
    const insertionLines = Object.keys(lineInsertions)
    if(labelLines && insertionLines){
        for(let labelLine of labelLines){
            labelLine = parseInt(labelLine)
            //Calcula desplazamiento por nuevas líneas insertadas
            let offset = 0
            for(let insertionLine of insertionLines){
                insertionLine = parseInt(insertionLine)
                if(insertionLine<labelLine) offset += parseInt(lineInsertions[insertionLine])
            }
            //Si existe desplazamiento...
            console.log(labelLine, offset)
            if(offset!=0){
                const newLabel = `RENGLON${labelLine+offset}`
                //Corrige etiquetas en las instrucciones de salto
                for(let jumpLine of jumps[labelLine]){
                    jumpLine = parseInt(jumpLine)
                    console.log(jumpLine)
                    assembly[jumpLine-1][1] = newLabel
                }
                //Inserta etiquetas en las lineas
                assembly[labelLine+1].unshift(newLabel)
            }
        }
    }
    //Añadir etiquetas faltantes
    for(let i=0; i<assembly.length; i++){
        if(assembly[i].length<=3) assembly[i].unshift(i+1)
    }
    console.log(lineInsertions, jumps)
    return assembly
}

const updateJumps = (jumps, labelLine, jumpLine) => {
    const labelLines = Object.keys(jumps)
    if(labelLines){
        if(labelLines.includes(labelLine)) jumps[labelLine].push(jumpLine)
        else jumps[labelLine] = [jumpLine]
    }
    else jumps[labelLine] = [jumpLine]
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