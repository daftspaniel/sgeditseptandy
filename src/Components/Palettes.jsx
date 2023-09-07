import Palette from './Palette'

import './Palettes.css'

const Palettes = () => {
  return (
    <div className="Palettes">
      <Palette range={{ start: 128, end: 256 }} />
      <Palette range={{ start: 0, end: 128 }} />
    </div>
  )
}

export default Palettes
