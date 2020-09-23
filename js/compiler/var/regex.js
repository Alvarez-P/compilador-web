const linesRegex = {
    function: /[a-zA-Z0-9$_@]+\s+[a-zA-Z0-9$_@]+\s*\(+[\W\w=!><+\-*/]*\)+/,
    while: /[a-zA-Z0-9$_@]+\s*\(+[\W\w=!><+\-*/]*\)+/,
    operation: /[a-zA-Z0-9$_@]+\s+[=!><+\-*/]*\s+[a-zA-Z0-9$_@]+/, // /[a-zA-Z0-9$_@]+\s+([a-zA-Z0-9$_@]+\s+){0,1}[=!><+\-*/]*\s+[a-zA-Z0-9$_@]+/
    delimiter: /[{}]+/
}

const matchingTokens = {
    ID: /^[a-zA-Z$_]{1,1}[a-zA-Z0-9\_]{0,}$/,
    TDF: /^(int|float|boolean|double|char|void)$/,
    TDV: /^(int|float|boolean|double|char)$/,
    CNE: /^[0-9]{1,}$/,
    CNPF: /^[0-9]{1,}\.[0-9]{1,}$/,
    DEL: /[\(|\)|{|}]/,
    AS: /^=$/,
    SEP: /,/,
    OA: /^[+|\-|*|/|%]$/,
    DELSO: /^\($/,
    DELSE: /^\)$/,
    DELFO: /^{$/,
    DELFE: /^}$/
}

export {
    linesRegex,
    matchingTokens
}