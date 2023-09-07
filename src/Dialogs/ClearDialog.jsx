import { useState } from 'react'
import { useGlobalState } from '../State/Store'
import './Dialog.css'

const colours = [
  { value: 0, colour: '#111111', chr: 128 },
  { value: 1, colour: '#09ff08', chr: 143 },
  { value: 2, colour: '#fdff41', chr: 159 },
  { value: 3, colour: '#2110b6', chr: 175 },
  { value: 4, colour: '#b50421', chr: 191 },
  { value: 5, colour: '#ffffff', chr: 207 },
  { value: 6, colour: '#09d773', chr: 223 },
  { value: 7, colour: '#ff1cff', chr: 239 },
  { value: 8, colour: '#ff4107', chr: 255 },
]

const ClearDialog = () => {
  const state = useGlobalState()
  const isDialogVisible = state.getShowClearDialog()
  const options = {}

  const closeDialog = () => state.setShowClearDialog(false)
  const actionDialog = () => {
    state.clearScreen({ cls: cls })
    closeDialog()
  }
  const handleClsChange = (e) => setCls(e.target.value)

  let [cls, setCls] = useState(1)

  if (!isDialogVisible) {
    return null
  }

  return (
    <div className="clearDialog">
      ASDF
      <div>CLS</div>
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
      <button onClick={closeDialog}>Cancel</button>
      <button onClick={actionDialog}>OK</button>
    </div>
  )
}

export default ClearDialog
