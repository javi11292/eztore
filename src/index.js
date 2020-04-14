import { useEffect, useState, useCallback } from "react"
import produce from "immer"

export function getStore(values) {
  function useStore(key, subscribe = true) {
    const update = useCallback(value => store.update(key, value), [key])

    const [state, setState] = useState(store.get(key))

    useEffect(() => {
      if (!subscribe) return
      store.addCallback(key, setState)
      return () => store.removeCallback(key, setState)
    }, [key, subscribe])

    return subscribe ? [state, update] : update
  }

  const store = {
    get(key) {
      return this.values[key].state
    },

    addCallback(key, callback) {
      this.callbacks[key].add(callback)
    },

    removeCallback(key, callback) {
      this.callbacks[key].delete(callback)
    },

    update(key, value) {
      const field = this.values[key]
      const { state, reducer } = field

      const nextState = produce(state, draftState => reducer(draftState, value))
      if (state === nextState) return
      field.state = nextState

      this.callbacks[key].forEach(callback => callback(nextState))
    },

    values,
    callbacks: Object.keys(values).reduce(addCallbacks, {}),
  }

  return useStore
}

function addCallbacks(callbacks, key) {
  return { ...callbacks, [key]: new Set() }
}