import { useGlobalState } from '../State/StateStore'

import './ButtonPanel.css'
import './Toggle.css'

const ButtonPanel = () => {
  const state = useGlobalState()
  const showClearDialog = () => state.setShowClearDialog(true)
  const showExportDialog = () => state.setShowExportDialog(true)
  const toggleGrid = () => state.setShowGrid(!state.getShowGrid())
  const scroll = (direction) => state.scrollScreen(direction)
  const mirror = (direction) => state.mirrorScreen(direction)

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
        <input
          className="tog"
          type="checkbox"
          id="demo"
          onChange={toggleGrid}
          checked={state.getShowGrid()}
        />
        <label className="tog" htmlFor="demo"></label>
      </div>
      SCROLL
      <div className="scrollButtons">
        <button className="scrollButton" onClick={() => scroll('u')}>
          ⬆️
        </button>
        <button className="scrollButton" onClick={() => scroll('d')}>
          ⬇️
        </button>
        <button className="scrollButton" onClick={() => scroll('l')}>
          ⬅️
        </button>
        <button className="scrollButton" onClick={() => scroll('r')}>
          ➡️
        </button>
      </div>
      MIRROR
      <div className="mirrorButtons">
        <button className="mirrorButton" onClick={() => mirror('LtoR')}>
          L &#65516; R
        </button>
        <button className="mirrorButton" onClick={() => mirror('BtoT')}>
          B &#65516; T
        </button>
        <button className="mirrorButton" onClick={() => mirror('TtoB')}>
          T &#65516; B
        </button>
        <button className="mirrorButton" onClick={() => mirror('RtoL')}>
          R &#65516; L
        </button>
      </div>
    </div>
  )
}

export default ButtonPanel
