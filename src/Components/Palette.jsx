import { SG4 } from '../Common/ScreenModes'
import { intToHex } from '../Lib/Util'
import CharacterSet from '../Common/CharacterSet'
import { useGlobalState } from '../State/Store'

import './Palette.css'

const Palette = (props) => {
  const chars = []
  const state = useGlobalState()
  const style = { width: SG4.width, height: SG4.height, marginRight: 3 }

  for (let i = props.range.start; i < props.range.end; i++) {
    chars.push(i)
  }

  return (
    <div className="Palette" onContextMenu={(e) => e.preventDefault()}>
      {chars.map((char) => (
        <img
          id={intToHex(char)}
          title={char}
          alt={char}
          key={char}
          src={CharacterSet[intToHex(char)]}
          style={style}
          onClick={(e) => state.setPrimaryChar(char)}
          onContextMenu={(e) => state.setSecondaryChar(char)}
        />
      ))}
    </div>
  )
}

export default Palette
