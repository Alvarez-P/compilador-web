let countersTk = {
    ID: 1,
    TD: 1,
    AS: 1,
    CNE: 1,
    CNPF: 1,
    DEL: 1,
    SEP: 1,
    OA: 1,
    SPACE: 1,
    ENTER: 1,
  },
  countErrorsTk = {
    ID: 1,
    TD: 1,
    CNE: 1,
    CNPF: 1,
    DEL: 1,
    AS: 1,
    SEP: 1,
    OA: 1,
  }, errorTokens = {
    ID : { description: 'Identificador inválido' },
    TD : { description: 'Tipo de dato inválido' },
    TDF : { description: 'Tipo de función inválido' },
    TDV : { description: 'Tipo de parámetro inválido' },
    CNE : { description: 'No se reconoce el número' },
    CNPF : { description: 'No se reconoce el número flotante' },
    DEL : { description: 'Se esperaba un delimitador' },
    AS : { description: 'Se esperaba signo de asignación' },
    SEP : { description: 'Se esperaba un seperardor (,)' },
    OA : { description: 'Operador inválido' },
    DELO: { description: 'Se esperaba token {' },
    DELE: { description: 'Se esperaba token }' }
}

export {
    countersTk,
    countErrorsTk,
    errorTokens
}