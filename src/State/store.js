import { hookstate, useHookstate } from '@hookstate/core'
import { localstored } from '@hookstate/localstored'

import { SG4 } from '../Common/ScreenModes'
import { buildGrid } from '../Lib/Util.js'

const initialState = hookstate(
  {
    primaryChar: 128,
    secondaryChar: 207,
    activeMode: SG4,
    screenData: buildGrid(SG4.columns, SG4.rows, SG4.defaultCharacter),
    dialogs: { showClearDialog: false },
  },
  localstored({
    key: 'state-key',
  })
)

export const useGlobalState = () => {
  const state = useHookstate(initialState)

  return {
    getActiveMode: () => state.activeMode.value,
    getScreenData: () => state.screenData.value,
    getPrimaryChar: () => state.primaryChar.value,
    setPrimaryChar: (char) => state.primaryChar.set(char),
    getSecondaryChar: () => state.secondaryChar.value,
    setSecondaryChar: (char) => state.secondaryChar.set(char),
    setChar: (details) => state.screenData[details.x][details.y].set(details),
    getShowClearDialog: () => state.dialogs.value.showClearDialog,
    setShowClearDialog: (flag) =>
      state.dialogs.set({ ...state.dialogs.value, showClearDialog: flag }),

    clearScreen: (options) => {
      if (options.testcard) {
        const mode = state.activeMode.value
        const data = buildGrid(mode.columns, mode.rows, mode.defaultCharacter)
        let char = 0

        for (let y = 0; y < mode.rows; y++) {
          for (let x = 0; x < mode.columns; x++) {
            data[x][y].value = char
            char++
            if (char > 255) {
              char = 0
            }
          }
        }
        state.screenData.set(data)
        return
      }

      state.screenData.set(buildGrid(SG4.columns, SG4.rows, options.char))
    },
  }
}
