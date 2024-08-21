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
    undoStack: [],
    redoStack: [],
  },
  localstored({
    key: 'state-key',
  })
)

export const useGlobalState = () => {
  const state = useHookstate(initialState)

  const getScreenData = () => JSON.parse(JSON.stringify(state.screenData.value))
  const getRedoStack = () => JSON.parse(JSON.stringify(state.redoStack.value))
  const getUndoStack = () => JSON.parse(JSON.stringify(state.undoStack.value))
  const addToUndoStack = () => {
    let undoStack = getUndoStack()

    if (undoStack.length > 10) {
      undoStack = undoStack.slice(-10)
    }
    console.log(undoStack.length)
    undoStack.push(getScreenData())
    state.undoStack.set(undoStack)
  }

  return {
    setShowGrid: (flag) => state.showGrid.set(flag),
    getShowGrid: () => state.showGrid.value,
    getActiveMode: () => state.activeMode.value,
    getScreenData: () => state.screenData.value,
    getPrimaryChar: () => state.primaryChar.value,
    setPrimaryChar: (char) => state.primaryChar.set(char),
    getSecondaryChar: () => state.secondaryChar.value,
    setSecondaryChar: (char) => state.secondaryChar.set(char),
    setChar: (details) => {
      addToUndoStack()
      state.screenData[details.x][details.y].set(details)
    },
    getShowClearDialog: () => state.dialogs.value.showClearDialog,
    setShowClearDialog: (flag) =>
      state.dialogs.set({ ...state.dialogs.value, showClearDialog: flag }),
    getShowExportDialog: () => state.dialogs.value.showExportDialog,
    setShowExportDialog: (flag) =>
      state.dialogs.set({ ...state.dialogs.value, showExportDialog: flag }),

    clearScreen: (options) => {
      addToUndoStack()

      if (options.testcard) {
        buildTestCard(state)
        return
      }

      state.screenData.set(buildGrid(SG4.columns, SG4.rows, options.char))
    },
    importCSVData: (csvData) => {
      addToUndoStack()
      state.screenData.set(importHandler(csvData))
    },
    scrollScreen: (direction) => {
      addToUndoStack()
      state.screenData.set(scrollScreen(direction, getScreenData(), SG4))
    },
    mirrorScreen: (direction) => {
      addToUndoStack()
      state.screenData.set(mirrorScreen(direction, getScreenData(), SG4))
    },

    undo: () => {
      const undoStack = getUndoStack()

      if (undoStack.length > 0) {
        const screenData = undoStack.pop()
        const redoStack = getRedoStack()

        state.screenData.set(screenData)
        redoStack.push(screenData)

        state.undoStack.set(undoStack)
        state.redoStack.set(redoStack)
      }
    },
  }
}
