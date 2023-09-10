import { intToHex } from "./Util"

export const generateASM = (data, columns, rows) => {
  const fullASMCode =
    "        ORG $4E21\r\n" +
    "        PSHS X,Y,U,A,B\r\n" +
    "        \r\n" +
    "        LDX #$400\r\n" +
    "        LDY #TSB\r\n" +
    "        \r\n" +
    "DRAW    LDD ,Y++\r\n" +
    "        STD ,X++\r\n" +
    "        CMPX #$600\r\n" +
    "        BNE DRAW\r\n" +
    "        \r\n" +
    "EXIT    PULS X,Y,U,A,B\r\n" +
    "        RTS ; EXIT PROGRAM\r\n\r\n"
  let fcbs = ""

  for (let j = 0; j < rows; j++) {
    let fcbline = String.fromCharCode(9) + "fcb" + String.fromCharCode(9)
    for (let i = 0; i < columns; i++) {
      let fcbval = intToHex(data[i][j].value)
      fcbline += "$" + fcbval + ","
    }
    fcbline = fcbline.substr(0, fcbline.length - 1) + String.fromCharCode(13)
    fcbs += fcbline
  }

  fcbs = "TSB    " + fcbs

  return fullASMCode + fcbs
}
