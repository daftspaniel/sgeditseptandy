import { useGlobalState } from '../State/Store'

import './ButtonPanel.css'

const ButtonPanel = () => {
  const state = useGlobalState()
  const showClearDialog = () => state.setShowClearDialog(true)
  const showExportDialog = () => state.setShowExportDialog(true)

  return (
    <div className='buttonColumn'>
      <button className="actionButton" onClick={showClearDialog}>
        CLS
      </button>      
      <button className="actionButton" onClick={showExportDialog}>
        CODE
      </button>

    </div>
  )
}

export default ButtonPanel
