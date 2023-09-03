import { hookstate, useHookstate } from '@hookstate/core'

const initialState = hookstate({
  primaryChar: 128,
  secondaryChar: 207
})

export const useGlobalState = () => {
  const state = useHookstate(initialState)

  return {
    getPrimaryChar: () => state.primaryChar,
    getSecondaryChar: () => state.secondaryChar,
    setPrimaryChar: (char) => state.primaryChar.set(char),
    setSecondaryChar: (char) => state.secondaryChar.set(char),
  }
}
