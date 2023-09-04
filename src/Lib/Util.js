export const hexToInt = (dataval) => parseInt(dataval, 16)
export const intToHex = (dataval) => parseInt(dataval).toString(16)

export const buildGrid = (gridWidth, gridHeight, defaultValue) => {
  const data = []

  for (let column = 0; column < gridWidth; column++) {
    data.push([])
    for (let row = 0; row < gridHeight; row++) {
      data[column].push({
        x: column,
        y: row,
        value: defaultValue,
      })
    }
  }
  return data
}

export const getElementClickXY = (e, cellWidth, cellHeight) => {
  const pos = {}
  const rect = e.target.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top
  const cellPos = {
    x: Math.floor(mx / cellWidth),
    y: Math.floor(my / cellHeight),
  }
  pos.x = Math.floor(mx / cellWidth) * cellWidth
  pos.y = Math.floor(my / cellHeight) * cellHeight
  return { pos, cellPos }
}
