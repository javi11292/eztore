import { useEffect, useState, useCallback } from "react"

function addCallbacks(callbacks, key) {
  return { ...callbacks, [key]: new Set() }
}

export function getStore(values) {
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

      field.state = reducer(state, value)
      if (state !== field.state) {
        this.callbacks[key].forEach(callback => callback(field.state))
      }
    },

    values,
    callbacks: Object.keys(values).reduce(addCallbacks, {}),
  }

  function useStore(key, subscribe = true) {
    const [state, setState] = useState(store.get(key))

    const update = useCallback(value => store.update(key, value), [key])

    useEffect(() => {
      if (!subscribe) return
      store.addCallback(key, setState)
      return () => store.removeCallback(key, setState)
    }, [key, subscribe])

    return subscribe ? [state, update] : update
  }

  return useStore
}