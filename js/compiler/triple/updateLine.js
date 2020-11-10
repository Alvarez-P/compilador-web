export const replaceWithTemporal = (line, lxmsCount) => (index, temp) => {
    line.splice(index, 3, temp)
    lxmsCount-=2
}

export const deleteLexemes = (line, lxmsCount) => (index) => {
    line.splice(index, 3)
    lxmsCount-=3
}