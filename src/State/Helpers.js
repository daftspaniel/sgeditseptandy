import { buildGrid } from '../Lib/Util.js'
import { SG4 } from '../Common/ScreenModes'

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

export const importHandler = (csvData) => {
  const rows = SG4.rows
  const columns = SG4.columns
  const data = buildGrid(SG4.columns, SG4.rows, SG4.defaultCharacter)
  
  let index = 0
  let newdata = csvData
    .replace('\r\n', '')
    .replace('\n', '')
    .replace('\r', '')
  newdata = newdata.split(',')

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < columns; i++) {
      data[i][j].value = newdata[index]
      index++
    }
  }

  return data
}
