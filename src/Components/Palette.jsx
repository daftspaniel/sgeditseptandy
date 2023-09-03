import React from 'react'

import { SG4 } from '../Common/ScreenModes'
import { intToHex } from '../Lib/Util'
import CharacterSet from '../Common/CharacterSet'
import { useGlobalState } from '../State/store'

const Palette = (props) => {
  const w = SG4.width
  const h = SG4.height
  const chars = []
  const state = useGlobalState()

  for (let i = props.range.start; i < props.range.end; i++) {
    chars.push(i)
  }

  return (
    <div
      className="Palette"
      onContextMenu={(e) => {
        e.preventDefault()
      }}
    >
      {chars.map((char) => (
        <img
          id={intToHex(char)}
          title={char}
          alt={char}
          key={char}
          src={CharacterSet[intToHex(char)]}
          style={{ width: w, height: h, marginRight: 3 }}
          onClick={(e) => {
            state.setPrimaryChar(char)
          }}
          onContextMenu={(e) => {
            state.setSecondaryChar(char)
          }}
        />
      ))}
    </div>
  )
}

export default Palette
