import { useGlobalState } from '../State/StateStore'

import './ButtonPanel.css'
import './Toggle.css'

const ButtonPanel = () => {
  const state = useGlobalState()
  const showClearDialog = () => state.setShowClearDialog(true)
  const showExportDialog = () => state.setShowExportDialog(true)
  const toggleGrid = () => state.setShowGrid(!state.getShowGrid())

  return (
    <div className="buttonColumn">
      <button className="actionButton" onClick={showClearDialog}>
        CLS
      </button>
      <button className="actionButton" onClick={showExportDialog}>
        CODE
      </button>
      <div className="gridToggle">
        GRID
        <input className="tog" type="checkbox" id="demo" onClick={toggleGrid} checked={state.getShowGrid()}/>
        <label className="tog" htmlFor="demo"></label>
      </div>
    </div>
  )
}

export default ButtonPanel
