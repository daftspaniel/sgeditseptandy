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
    setShowClearDialog: (flag) => {
      console.log(flag)
      console.log(state.dialogs)
      state.dialogs.set({ ...state.dialogs.value, showClearDialog: flag })
      console.log(state.dialogs.value)
    },
    clearScreen: (options) => {
      console.log(options)
      state.screenData.set(buildGrid(SG4.columns, SG4.rows, SG4.defaultCharacter))
    },
  }
}
