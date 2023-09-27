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
  let newdata = csvData.replace('\r\n', '').replace('\n', '').replace('\r', '')
  newdata = newdata.split(',')

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < columns; i++) {
      data[i][j].value = newdata[index]
      index++
    }
  }

  return data
}

export const scrollScreen = (direction, data, mode) => {
  let tmp = []
  if (direction === 'u') {
    for (let i = 0; i < mode.columns; i++) {
      tmp.push(data[i][0].value)
    }

    for (let j = 0; j < mode.rows - 1; j++) {
      for (let i = 0; i < mode.columns; i++) {
        data[i][j].value = data[i][j + 1].value
      }
    }

    for (let i = 0; i < mode.columns; i++) {
      data[i][mode.rows - 1].value = tmp[i]
    }
  } else if (direction === 'd') {
    for (let i = 0; i < mode.columns; i++) {
      tmp.push(data[i][mode.rows - 1].value)
    }

    for (let j = mode.rows - 1; j > 0; j--) {
      for (let i = 0; i < mode.columns; i++) {
        data[i][j].value = data[i][j - 1].value
      }
    }

    for (let i = 0; i < mode.columns; i++) {
      data[i][0].value = tmp[i]
    }
  } else if (direction === 'l') {
    for (let j = 0; j < mode.rows; j++) {
      let tmp = data[0][j].value
      for (let i = 1; i < mode.columns; i++) {
        data[i - 1][j].value = data[i][j].value
      }
      data[mode.columns - 1][j].value = tmp
    }
  } else if (direction === 'r') {
    for (let j = 0; j < mode.rows; j++) {
      let tmp = data[mode.columns - 1][j].value
      for (let i = mode.columns - 1; i > 0; i--) {
        data[i][j].value = data[i - 1][j].value
      }
      data[0][j].value = tmp
    }
  }
  return data
}
