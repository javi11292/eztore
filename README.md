## Installation
`npm i eztore`

## Usage

```js
import { getStore } from "eztore"

export const useStore = getStore({
  [key1]: {
      state: initialState,
      reducer: (state, action) => newState
  },
  [key2]: {
      state: initialState,
      reducer: (state, action) => newState
  },
  ...
}
```

The getStore function returns a hook function like `function useStore(key, subscribe = true) { ... }`. Each call to getStore will return a new store.

The reducer function works like the reducer from useReducer hook, refer to [this page](https://reactjs.org/docs/hooks-reference.html#usereducer) for more details

You can access the state in any component by calling `useStore(key[, subscribe])`, which returns an array `[state, dispatch]` like useReducer. 
If you call useStore with `subscribe = false` it will only return the dispatch function and will not rerender on state changes.

## Example

store.js
```js
import { getStore } from "eztore"

export const useStore = getStore({
  name: {
    state: "",
    reducer: (state, value) => value,
  },
})
```

Component.js
```js
import React from "react"
import { useStore } from "store"

function Component() {
  const [name, setName] = useStore("name")

  function onChange(event){
    setName(event.target.value)
  }

  return <input value={name} onChange={onChange} />
}

export default Component
```