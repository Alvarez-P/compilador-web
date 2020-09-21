export default class Context {
    lineTypes = ["function", "operation", "while", "delimiter"]
    functionPlaces = ["outside", "onSignature", "onBlock"]
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
}