import './App.css'
import Palettes from './Components/Palettes'
import SelectedPalette from './Components/SelectedPalette'
import ScreenEditor from './Components/ScreenEditor'

const App = () => {
  return (
    <div>
      <h1>SG-Edit SepTandy 2023</h1>
      <ScreenEditor/>
      <SelectedPalette />
      <Palettes />
    </div>
  )
}

export default App
