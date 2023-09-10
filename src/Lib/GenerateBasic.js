export const generateBASIC = (data, columns, rows) => {
    let fullcode = "10 CLEAR2000:DIMT,A:CLS\r\n"
    fullcode += "20 FORT=1024TO1535:READA:POKET,A:NEXT\r\n"
    fullcode += '30 A$=INKEY$:IFA$="" THEN 30\r\n'
  
    let lineNo = 100
    let dataval
  
    for (let j = 0; j < rows; j++) {
      let dataline = " DATA "
      for (let i = 0; i < columns; i++) {
        dataval = parseInt(data[i][j].value, 10)
        dataline += dataval + ","
      }
      dataline = `${lineNo} ${dataline.substr(0, dataline.length - 1)}\n`
      fullcode += dataline
      lineNo += 10
    }
    return fullcode + "\r\n"
  }
  