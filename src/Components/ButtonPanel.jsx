import { useGlobalState } from '../State/Store'

const ButtonPanel = () => {
  const state = useGlobalState()
  const showClearDialog = () => state.setShowClearDialog(true)

  return (
    <div>
      <button className="actionButton" onClick={showClearDialog}>
        CLS
      </button>
    </div>
  )
}

export default ButtonPanel
