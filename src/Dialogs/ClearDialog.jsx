import { useState } from 'react'
import { useGlobalState } from '../State/Store'

import './Dialog.css'
import './ClearDialog.css'

export const getTestCard = (modeId) => {
  let char = 0
  const screenMode = getScreenModeById(modeId)
  const data = buildGrid(
    screenMode.columns,
    screenMode.rows,
    screenMode.defaultCharacter
  )

  for (let y = 0; y < screenMode.rows; y++) {
    for (let x = 0; x < screenMode.columns; x++) {
      data[x][y].value = char
      char++
      if (char > 255) char = 0
    }
  }

  return data
}

const colours = [
  { value: 0, colour: '#111111', char: 128 },
  { value: 1, colour: '#09ff08', char: 143 },
  { value: 2, colour: '#fdff41', char: 159 },
  { value: 3, colour: '#2110b6', char: 175 },
  { value: 4, colour: '#b50421', char: 191 },
  { value: 5, colour: '#ffffff', char: 207 },
  { value: 6, colour: '#09d773', char: 223 },
  { value: 7, colour: '#ff1cff', char: 239 },
  { value: 8, colour: '#ff4107', char: 255 },
]

const ClearDialog = () => {
  const state = useGlobalState()
  const isDialogVisible = state.getShowClearDialog()

  const closeDialog = () => state.setShowClearDialog(false)
  const actionDialog = () => {
    if (option == 1) {
      state.clearScreen({ char: colours[cls].char })
    }

    if (option == 2) {
      state.clearScreen({ testcard: true })
    }

    if (option == 3) {
      state.clearScreen({ char: char })
    }

    closeDialog()
  }
  const handleClsChange = (e) => setCls(e.target.value)

  let [cls, setCls] = useState(1)
  let [option, setOption] = useState(1)
  let [char, setChar] = useState(128)

  if (!isDialogVisible) {
    return null
  }

  return (
    <div className="clearDialog">
      <fieldset>
        <div className="clsRow">
          <input
            type="radio"
            name="clsType"
            checked={option == 1}
            onChange={() => setOption(1)}
          />
          <label className="dialogLabel">CLS</label>
          <div>
            <select
              value={cls}
              onChange={handleClsChange}
              style={{ width: 100, backgroundColor: colours[cls].colour }}
            >
              {colours.map((colour) => {
                return (
                  <option
                    key={colour.value}
                    value={colour.value}
                    style={{ width: 100, backgroundColor: colour.colour }}
                  >
                    &nbsp;
                  </option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="clsRow">
          <input
            type="radio"
            name="clsType"
            checked={option == 2}
            onChange={() => setOption(2)}
          />
          <label className="dialogLabel">Test Card</label>
        </div>
        <div className="clsRow">
          <input
            type="radio"
            name="clsType"
            checked={option == 3}
            onChange={() => setOption(3)}
          />

          <label className="dialogLabel">Fill</label>
          <input
            type="text"
            onChange={(e) => setChar(e.target.value)}
            value={char}
            className="numberbox"
          />
        </div>
      </fieldset>
      <div>
        <button className="actionButton" onClick={closeDialog}>
          Cancel
        </button>
        <button className="actionButton" onClick={actionDialog}>
          OK
        </button>
      </div>
    </div>
  )
}

export default ClearDialog
