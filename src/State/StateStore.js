import { hookstate, useHookstate } from '@hookstate/core'
import { localstored } from '@hookstate/localstored'

import { SG4 } from '../Common/ScreenModes'
import { buildGrid } from '../Lib/Util.js'
import {
  buildTestCard,
  importHandler,
  scrollScreen,
  mirrorScreen,
} from './Helpers.js'

const blank = buildGrid(SG4.columns, SG4.rows, SG4.defaultCharacter)

const initialState = hookstate(
  {
    primaryChar: 128,
    secondaryChar: 207,
    activeMode: SG4,
    screenData: blank,
    dialogs: { showClearDialog: false },
    showGrid: true,
  },
  localstored({
    key: 'state-key',
  })
)

export const useGlobalState = () => {
  const state = useHookstate(initialState)

  return {
    setShowGrid: (flag) => state.showGrid.set(flag),
    getShowGrid: () => state.showGrid.value,
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
    getShowExportDialog: () => state.dialogs.value.showExportDialog,
    setShowExportDialog: (flag) =>
      state.dialogs.set({ ...state.dialogs.value, showExportDialog: flag }),

    clearScreen: (options) => {
      if (options.testcard) {
        buildTestCard(state)
        return
      }

      state.screenData.set(buildGrid(SG4.columns, SG4.rows, options.char))
    },
    importCSVData: (csvData) => state.screenData.set(importHandler(csvData)),
    scrollScreen: (direction) =>
      state.screenData.set(
        scrollScreen(
          direction,
          JSON.parse(JSON.stringify(state.screenData.value)),
          SG4
        )
      ),
    mirrorScreen: (direction) =>
      state.screenData.set(
        mirrorScreen(
          direction,
          JSON.parse(JSON.stringify(state.screenData.value)),
          SG4
        )
      ),
  }
}
