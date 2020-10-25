const replaceWithTemporal = (line) => (index, temp) => {
    line.splice(index, 3, temp)
}
export default replaceWithTemporal