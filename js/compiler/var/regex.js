const linesRegex = {
    function: /[a-zA-Z$_@]+\s+[a-zA-Z$_@]+s*\(*\w*\)*/,
    while: /[a-zA-Z]+\s*\(*\w*\)*/,
    operation: /[a-zA-Z$_@]+\s+[=|+|\-|*|/]*\s+[a-zA-Z$_@]+/,
    delimiter: /[{}]*/
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
    DELO: /^{$/,
    DELE: /^}$/
}

export {
    linesRegex,
    matchingTokens
}