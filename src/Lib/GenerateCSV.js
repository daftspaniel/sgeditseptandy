export const generateCSV = (data, columns, rows) => {
  let fullcode = ""

  for (let j = 0; j < rows; j++) {
    let dataline = ""
    for (let i = 0; i < columns; i++) {
      dataline += parseInt(data[i][j].value, 10) + ","
    }
    fullcode += `${dataline.substr(0, dataline.length - 1)},\r\n`
  }
  return fullcode + "\r\n"
}
