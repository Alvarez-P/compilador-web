const TokensName = ['ID', 'TD', 'AS', 'CNE', 'CNPF', 'DEL', 'SEP', 'OA']
const tokenCounter = {}, errorTokenCounter = {}

TokensName.forEach(tokenName => {
  tokenCounter[tokenName] = 1
  errorTokenCounter[`ERLX${tokenName}`] = 1
})

const errorMessages = {
  ID: { description: 'Identificador inválido' },
  TD: { description: 'Tipo de dato inválido' },
  TDF: { description: 'Tipo de función inválido' },
  TDV: { description: 'Tipo de parámetro inválido' },
  CNE: { description: 'No se reconoce el número' },
  CNPF: { description: 'No se reconoce el número flotante' },
  DEL: { description: 'Se esperaba un delimitador' },
  AS: { description: 'Se esperaba signo de asignación' },
  SEP: { description: 'Se esperaba un seperardor (,)' },
  OA: { description: 'Operador inválido' },
  DELO: { description: 'Se esperaba token {' },
  DELE: { description: 'Se esperaba token }' }
}

export {
  tokenCounter,
  errorTokenCounter,
  errorMessages
}