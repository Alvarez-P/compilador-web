export default class Context {
    lineTypes = ["function", "operation", "while", "delimiter"]
    functionPlaces = ["outside", "onSignature", "onBlock"]
    scope = []
    constructor (lineType, functionPlace, scope, lastToken, opDType, numberLine, expectedTokens) {
        if(this.lineTypes.includes(lineType)) this.lineType = lineType
        if(this.functionPlaces.includes(functionPlace)) this.functionPlace = functionPlace
        this.scope = scope
        this.lastToken = lastToken
        this.opDType = opDType
        this.numberLine = numberLine
        this.expectedTokens = expectedTokens
    }
    set lineType(lineType) {
        if(this.lineTypes.includes(lineType)) this.lineType = lineType
    }
    set functionPlace(functionPlace) {
        if(this.functionPlaces.includes(functionPlace)) this.functionPlace = functionPlace
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
}