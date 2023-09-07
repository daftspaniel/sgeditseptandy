import { useGlobalState } from '../State/Store'

import './ButtonPanel.css'

const ButtonPanel = () => {
  const state = useGlobalState()
  const showClearDialog = () => state.setShowClearDialog(true)

  return (
    <div className='buttonColumn'>
      <button className="actionButton" onClick={showClearDialog}>
        CLS
      </button>
    </div>
  )
}

export default ButtonPanel
