import { useGlobalState } from '../State/Store'
import { getElementClickXY, intToHex } from '../Lib/Util'

import './ScreenEditor.css'

const mouseState = { leftButtonDown: false, rightButtonDown: false }
let canvas = null
let context = null

const ScreenEditor = () => {
  const state = useGlobalState()
  const screenMode = state.getActiveMode()
  const showGrid = false
  const primaryCharacter = state.getPrimaryChar()
  const secondaryCharacter = state.getSecondaryChar()

  const canvasClickHandler = (screenMode, e, character, showGrid) => {
    const image = document.getElementById(intToHex(character))
    drawChar(screenMode, e, image, character, showGrid)
  }

  const drawChar = (screenMode, e, image, character, showGrid) => {
    const { pos, cellPos } = getElementClickXY(
      e,
      screenMode.pixelWidth,
      screenMode.pixelHeight
    )
    const brushSize = 1
    if (cellPos.x < screenMode.columns && cellPos.y < screenMode.rows) {
      for (let x = 0; x < brushSize; x++)
        for (let y = 0; y < brushSize; y++)
          context.drawImage(
            image,
            pos.x + x * screenMode.pixelWidth,
            pos.y + y * screenMode.pixelHeight
          )

      state.setChar({ x: cellPos.x, y: cellPos.y, value: character })
    }
    showGrid && drawGrid(screenMode)
  }

  const mouseMoveHandler = (
    screenMode,
    e,
    primaryCharacter,
    secondaryCharacter,
    showGrid
  ) => {
    let image, character
    if (mouseState.leftButtonDown) {
      image = document.getElementById(intToHex(primaryCharacter))
      character = primaryCharacter
    } else if (mouseState.rightButtonDown) {
      image = document.getElementById(intToHex(secondaryCharacter))
      character = secondaryCharacter
    }
    if (!image) return
    drawChar(screenMode, e, image, character, showGrid)
  }

  setTimeout(() => {
    const screenMode = state.getActiveMode()
    const screenData = state.getScreenData()
    if (!canvas) {
      canvas = document.getElementById('sgscreen')
      context = canvas.getContext('2d')
      context.imageSmoothingEnabled = false
      context.strokeStyle = '#000000'
      context.lineWidth = 1
    }

    for (let j = 0; j < screenMode.rows; j++) {
      for (let i = 0; i < screenMode.columns; i++) {
        const x = i * screenMode.pixelWidth
        const y = j * screenMode.pixelHeight
        if (screenData) {
          const ch = screenData[i][j].value
          const hex = intToHex(ch)
          const img = document.getElementById(hex)
          if (img) {
            context.drawImage(img, x, y)
          }
        }
      }
    }

    showGrid && drawGrid(screenMode)
  }, 200)

  return (
    <div className="EditorPanel">
      <canvas
        id="sgscreen"
        className="tcanvas"
        onMouseUp={(e) => {
          if (e.button === 2) {
            mouseState.rightButtonDown = false
          } else if (e.button === 0) {
            mouseState.leftButtonDown = false
          }
        }}
        onMouseDown={(e) => {
          if (e.button === 2) {
            mouseState.rightButtonDown = true
            canvasClickHandler(screenMode, e, secondaryCharacter, showGrid)
          } else if (e.button === 0) {
            mouseState.leftButtonDown = true
            canvasClickHandler(screenMode, e, primaryCharacter, showGrid)
          }
        }}
        onMouseLeave={(e) => {
          mouseState.rightButtonDown = false
          mouseState.leftButtonDown = false
        }}
        onContextMenu={(e) => {
          e.preventDefault()
        }}
        onMouseMove={(e) =>
          mouseMoveHandler(
            screenMode,
            e,
            primaryCharacter,
            secondaryCharacter,
            showGrid
          )
        }
        width={screenMode ? screenMode.columns * screenMode.pixelWidth : 512}
        height={screenMode ? screenMode.rows * screenMode.pixelHeight : 384}
      ></canvas>
    </div>
  )
}
export default ScreenEditor
