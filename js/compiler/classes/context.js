export default class Context {
    lineTypes = ["function", "operation", "while", "delimiter"]
    isOpenWhile = false
    functionPlaces = ["outside", "onSignature", "onBlock"]
    operationPlaces = ["onDeclaration", "onOperation"]
    operationPlace = null
    operationDataType = 'any'
    lineType = null
    functionPlace = null
    scope = []
    lastToken = null
    lineNumber = 0
    expectedTokens = []
    blockJustOpened = null
    blockStack = []
    isCompilingPossible = true
    variablesLines = [] // [{ value, operators, line }]
    tokenLinesLength = 0

    set lineType(lineType) {
        this.lineType = lineType
    }
    set functionPlace(functionPlace) {
        if(this.functionPlaces.includes(functionPlace)) this.functionPlace = functionPlace
    }
    set lastToken(token){
        this.lastToken = token
    }
    set expectedTokens(tokens){
        this.expectedTokens = tokens
    }
    set operationDataType (operationDataType) {
        this.operationDataType = operationDataType
    }
    set operationPlace (operationPlace){
        if(this.operationPlaces.includes(operationPlace)) this.operationPlace = operationPlace
    }
    deleteLastScope () {
        this.scope.shift()
    }
    findVariable (lexeme) {
        let found = false, dataType = ''
        const lastScope = this.scope[0]
        for (let object of lastScope) {
            if (object.lexeme === lexeme) {
                dataType = object.dataType
                found = true
            }
            if (found) break
        }
        return dataType
    }
    findVariableInAllScopes (lexeme) {
        let found = false, dataType = ''
        for (let scope of this.scope) {
            for (let object of scope) {
                if (object.lexeme === lexeme) {
                    dataType = object.dataType
                    found = true
                }
                if (found) break
            }
            if (found) break
        }
        return dataType
    }
    addNewScope () {
        this.scope.unshift([])
    }
    addNewVariable (variable) {
        this.scope[0].unshift(variable)
    }
    resetOperationDataType () {
        this.operationDataType = 'any'
    }
    addVariablesLine (lexeme, line, inWhile) {
        const variablesLine = {
            value: lexeme,
            line,
            operators: new Set(),
            inWhile
        }
        this.variablesLines.unshift(variablesLine)
    }
    addOpInLastVariablesLine (operator) {
        this.variablesLines[0].operators.add(operator)
    }
}