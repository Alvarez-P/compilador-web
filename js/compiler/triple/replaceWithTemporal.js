const replaceWithTemporal = (line) => (index, temp) => {
    line.splice(index, 1, temp)
}
export default replaceWithTemporal