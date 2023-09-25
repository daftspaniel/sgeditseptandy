import { useState } from 'react'
import { useGlobalState } from '../State/StateStore'

import { colours } from './Helpers/ColorHelper'
import ActionButtons from './Common/ActionButtons'

import './Dialog.css'
import './ClearDialog.css'

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
      <ActionButtons close={closeDialog} action={actionDialog} />
    </div>
  )
}

export default ClearDialog
