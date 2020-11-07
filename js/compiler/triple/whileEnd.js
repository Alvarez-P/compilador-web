/**
 * @function conditionalInTriple
 * @param {Array} TRIPLE 
 * @param {Object} TripleCtx 
 */
const conditionalInTriple = (TRIPLE, TripleCtx) => (line) => {

    TRIPLE.push(['JR', '', TripleCtx.lastScopeStart])
    TripleCtx.lineNumber++
    const pendings = TripleCtx.lastPendingLineIndex
    pendings.forEach(pending => {
        TRIPLE[pending][0] = TripleCtx.lineNumber + 1
    });
}
export default conditionalInTriple