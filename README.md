## Installation
`npm i eztore`

## Usage

```js
import { getStore } from "eztore"

export const useStore = getStore({
  [key1]: {
      state: initialState,
      reducers: {
        [reducer]: (state, payload) => newState
      }
  },
  [key2]: {
      state: initialState,
      reducers: {
        [reducer]: (state, payload) => newState
      }
  },
  ...
}
```

The getStore function returns a hook function like `function useStore(key, subscribe = true) { ... }`. Each call to getStore will return a new store.

You can access the state in any component by calling `useStore(key[, subscribe])`, which returns an array `[state, dispatch]` like useReducer. 
If you call useStore with `subscribe = false` it will only return the dispatch function and will not rerender on state changes.

## Example

store.js
```js
import { getStore } from "eztore"

export const useStore = getStore({
  name: {
    state: "",
    reducers: {
      default(state, payload) {
        return payload
      },
      upperCase(state, payload) {
        return payload.toUpperCase()
      }
    }
  },
})
```

Component.js
```js
import React from "react"
import { useStore } from "store"

function Component() {
  const [name, dispatchName] = useStore("name")

  function onChange(event) {
    dispatchName({ payload: event.target.value })
    // if we want uppercase
    // dispatchName({ type: "upperCase", payload: event.target.value })
  }

  return <input value={name} onChange={onChange} />
}

export default Component
```