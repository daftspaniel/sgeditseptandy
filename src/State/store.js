import { hookstate, useHookstate } from '@hookstate/core'
import { localstored } from '@hookstate/localstored'

const initialState = hookstate(
  {
    primaryChar: 128,
    secondaryChar: 207,
  },
  localstored({
    key: 'state-key',
  })
)

export const useGlobalState = () => {
  const state = useHookstate(initialState)

  return {
    getPrimaryChar: () => state.primaryChar,
    getSecondaryChar: () => state.secondaryChar,
    setPrimaryChar: (char) => state.primaryChar.set(char),
    setSecondaryChar: (char) => state.secondaryChar.set(char),
  }
}
