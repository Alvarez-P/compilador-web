const linesRegex = {
    functions: /^([a-zA-Z0-9\$\-_]{1,})\s([a-zA-Z0-9\$\-_]{1,})\s(\()(\s*([a-zA-Z0-9\$\-_]{1,})\s([a-zA-Z0-9\$\-_]{1,})(\,\s([a-zA-Z0-9\$\-_]{1,})\s([a-zA-Z0-9\$\-_]{1,}))*)*\s*(\){0,1})\s(\{)$/g,
    operations: /^([a-zA-Z0-9\$\-_]{1,})\s(=)\s([a-zA-Z0-9\$_]{1,})\s([\/*\-+%a-zA-Z0-9\$\-_]{1,})\s([a-zA-Z0-9\$\-_]{1,})$/g,
    endFunctions: /^\}$/g
}

const tokensMatch = {
    ID : /^[a-zA-Z$_]{1,1}[a-zA-Z0-9\-_]{0,}$/,
    TDF : /^(int|float|boolean|double|char|void)$/,
    TDV:/^(int|float|boolean|double|char)$/,
    CNE : /^[0-9]{1,}$/,
    SPACE : /^ $/,
    ENTER : /^\n$/,
    CNPF : /^[0-9]{1,}\.[0-9]{1,}$/,
    DEL : /[\(|\)|{|}]/,
    AS : /^=$/,
    SEP : /,/,
    OA : /^[+|\-|*|/|%]$/
}

export {
    linesRegex,
    tokensMatch
}