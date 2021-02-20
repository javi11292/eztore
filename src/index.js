import { useEffect, useState, useCallback } from "react"
import { produce } from "immer"

function addCallbacks(callbacks, key) {
  return { ...callbacks, [key]: new Set() }
}

export function getStore(values) {
  function get(key) {
    return values[key].state
  }

  function set(key, value) {
    const field = values[key]
    const { state, reducer } = field

    field.state = produce(state, draftState => reducer(draftState, value))

    if (state !== field.state) {
      callbacks[key].forEach(callback => callback(field.state))
    }
  }

  function addCallback(key, callback) {
    callbacks[key].add(callback)
  }

  function deleteCallback(key, callback) {
    callbacks[key].delete(callback)
  }

  function useStore(key, subscribe = true) {
    const [state, setState] = useState(get(key))

    const updateState = useCallback(value => set(key, value), [key])

    useEffect(() => {
      if (!subscribe) return
      addCallback(key, setState)
      return () => deleteCallback(key, setState)
    }, [key, subscribe])

    return subscribe ? [state, updateState] : updateState
  }

  const callbacks = Object.keys(values).reduce(addCallbacks, {})

  return useStore
}