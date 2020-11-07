export const replaceWithTemporal = (line) => (index, temp) => {
    line.splice(index, 3, temp)
}

export const deleteLexemes = (line, lmxsCount) => (index) => {
    line.splice(index, 3)
    lmxsCount-=3
}