export default class Context {
    lineTypes = ["function", "operation", "while", "delimiter"]
    functionPlaces = ["outside", "onSignature", "onBlock"]
    operationPlaces = ["onDeclaration", "onOperation"]
    operationPlace = null
    operationDataType = 'any'
    lineType = null
    functionPlace = null
    scope = []
    lastToken = null
    lineNumber = null
    expectedTokens = []
    blockJustOpened = null
    blockStack = []

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
    addNewScope () {
        this.scope.unshift([])
    }
    addNewVariable (variable) {
        this.scope[0].unshift(variable)
    }
    resetOperationDataType(){
        this.operationDataType = 'any'
    }
}