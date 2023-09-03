import React from 'react'

import { SG4 } from '../Common/ScreenModes'
import { intToHex } from '../Lib/Util'
import CharacterSet from '../Common/CharacterSet'

import { useGlobalState } from '../State/Store'
const characterStyle = { width: 32, height: 48 }

const SelectedPalette = (props) => {
  const state = useGlobalState()
  const primaryCharacter = state.getPrimaryChar().value
  const secondaryCharacter = state.getSecondaryChar().value

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
