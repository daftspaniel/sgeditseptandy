import './App.css'
import Palettes from './Components/Palettes'
import SelectedPalette from './Components/SelectedPalette'

const App = () => {
  return (
    <div>
      <h1>SG-Edit SepTandy 2023</h1>
      <SelectedPalette />
      <Palettes />
    </div>
  )
}

export default App
