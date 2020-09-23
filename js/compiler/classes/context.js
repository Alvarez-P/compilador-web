export default class Context {
    //Me desespera no ver la definición de los atributos de clase xd
    lineTypes = ["function", "operation", "while", "delimiter"]
    functionPlaces = ["outside", "onSignature", "onBlock"]
    lineType = null
    functionPlace = null
    scope = []
    lastToken = null
    opDType = null
    lineNumber = null
    expectedTokens = []

    constructor (lineType, functionPlace, scope, lastToken, opDType, lineNumber, expectedTokens) {
        if(this.lineTypes.includes(lineType)) this.lineType = lineType
        if(this.functionPlaces.includes(functionPlace)) this.functionPlace = functionPlace
        this.scope = scope
        this.lastToken = lastToken
        this.opDType = opDType
        this.lineNumber = lineNumber
        this.expectedTokens = expectedTokens
    }
    set lineType(lineType) {
        if(this.lineTypes.includes(lineType)) this.lineType = lineType
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
    deleteLastScope () {
        this.scope.shift()
    }
    findVariable (lexeme) {
        let found = false, dataType = ''
        for (let currentScope of this.scope) {
            for (let object of currentScope) {
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
}