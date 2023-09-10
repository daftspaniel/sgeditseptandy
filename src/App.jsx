import './App.css'

import Palettes from './Components/Palettes'
import SelectedPalette from './Components/SelectedPalette'
import ScreenEditor from './Components/ScreenEditor'
import ButtonPanel from './Components/ButtonPanel'
import ClearDialog from './Dialogs/ClearDialog'
import ExportDialog from './Dialogs/ExportDialog'

const App = () => {
  return (
    <div>
      <h1>SG-Edit SepTandy 2023</h1>
      <div className="mainLayout">
        <div className="maincolumn1">
          <ButtonPanel />
        </div>
        <div className="maincolumn2">
          <ScreenEditor />
          <SelectedPalette />
        </div>
        <div className="maincolumn3">
          <Palettes />
        </div>
      </div>
      <ClearDialog />
      <ExportDialog />
    </div>
  )
}

export default App
