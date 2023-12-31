import { intToHex } from '../Lib/Util'
import CharacterSet from '../Common/CharacterSet'

import { useGlobalState } from '../State/StateStore'

import './SelectedPalette.css'

const characterStyle = { width: 32, height: 48 }

const SelectedPalette = () => {
  const state = useGlobalState()
  const primaryCharacter = state.getPrimaryChar()
  const secondaryCharacter = state.getSecondaryChar()

  return (
    <div className="SelectedPalette">
      <div className="CharacterSelection">
        <img
          id={primaryCharacter}
          alt={state.getPrimaryChar()}
          key={'P' + primaryCharacter}
          style={characterStyle}
          src={CharacterSet[intToHex(primaryCharacter)]}
        />
      </div>
      <div className="CharacterSelection">
        <img
          id={primaryCharacter}
          alt={state.getSecondaryChar()}
          key={'S' + primaryCharacter}
          style={characterStyle}
          src={CharacterSet[intToHex(secondaryCharacter)]}
        />
      </div>
    </div>
  )
}

export default SelectedPalette
