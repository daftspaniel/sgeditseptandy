import { buildGrid } from '../Lib/Util.js'

export const buildTestCard = (state) => {
  const mode = state.activeMode.value
  const data = buildGrid(mode.columns, mode.rows, mode.defaultCharacter)
  let char = 0

  for (let y = 0; y < mode.rows; y++) {
    for (let x = 0; x < mode.columns; x++) {
      data[x][y].value = char
      char++
      if (char > 255) {
        char = 0
      }
    }
  }
  state.screenData.set(data)
}
