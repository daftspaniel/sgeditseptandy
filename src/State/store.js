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
  }
}
