export default class TripleContext {
    lineTypes = ['operation', 'while', 'whileEnd']
    logicalOperators = ['&&', '||', 'without']
    lineType = ''
    pendingLinesIndex = []
    logicalOperator = null // null - && - || - without
    pendingCondLinesIndexes = []
    lineNumber = 0
    scopesBeginnings = []

    set lineNumber(lineNumber) {
        this.lineNumber = lineNumber
    }
    get lineNumber() {
        return this.lineNumber
    }
    set lineType(lineType) {
        if(this.lineTypes.includes(lineType)) this.lineType = lineType
    }
    get lineType() {
        return this.lineType
    }
    set logicalOperator(logicalOperator) {
        if(this.logicalOperators.includes(logicalOperator)) this.logicalOperator = logicalOperator
    }
    get logicalOperator() {
        return this.logicalOperator
    }
    addPendingLineIndex() {
        this.pendingLinesIndex.unshift([])
    }
    addInTheLastPendingLineIndex(lineNumber) {
        this.pendingLinesIndex[0].unshift(lineNumber)
    }
    addPendingCondLineIndex() {
        this.pendingCondLinesIndexes.unshift([])
    }
    addInTheLastPendingCondLinesIndexes(pendingCondLineIndex){
        this.pendingCondLinesIndexes.unshift(pendingCondLineIndex)
    }
    addScopeStart(lineNumber) {
        this.scopesBeginnings.unshift(lineNumber)
    }
    get lastScopeStart() {
        return this.scopesBeginnings.splice(0, 1)[0]
    }
    get lastPendingLineIndex() {
        return this.pendingLinesIndex.splice(0, 1)[0]
    }
    get lastPendingCondLinesIndexes() {
        return this.pendingCondLinesIndexes.splice(0, 1)[0]
    }
}