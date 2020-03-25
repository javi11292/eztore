import { useEffect, useState, useCallback } from "react"
import produce from "immer"

function addCallbacks(callbacks, key) {
  return { ...callbacks, [key]: new Set() }
}

function getStore(values) {
  const store = {
    values,
    callbacks: Object.keys(values).reduce(addCallbacks, {}),

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
  }

  function useStore(key, subscribe = true) {
    const [state, setState] = useState(store.get(key))

    useEffect(() => {
      if (!subscribe) return
      store.addCallback(key, setState)
      return () => store.removeCallback(key, setState)
    }, [key, subscribe])

    const update = useCallback(value => store.update(key, value), [key])

    return subscribe ? [state, update] : update
  }

  return useStore
}

export default getStore