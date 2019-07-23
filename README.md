State manager made with hooks and context API.

## Installation
`npm i eztore`

## Usage

Make `<Store>` the parent of the components that need to access the state (the application root is a good place if you want a global state),
and pass him the reducers object that has the following structure:
```js
{
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

The reducer function works like the reducer from useReducer hook, refer to [this page](https://reactjs.org/docs/hooks-reference.html#usereducer) for more details

Then you can access the state by calling `useStore(key)`, which returns an array `[state, dispatch]` like useReducer

## Example

reducers.js
```js
export default {
    name: {
        state: "",
        reducer: (state, value) => value,
    }
}
```

Component.js
```js
import React from "react"
import { useStore } from "eztore"

const Component = props => {
    const [name, setName] = useStore("name")

    function onChange(event){
        setName(event.target.value)
    }

    return <input value={name} onChange={onChange} />
}

export default Component
```

App.js
```js
import React from "react"
import { Store } from "eztore"
import reducers from "./reducers"
import Component from "./Component"

const App = props => {
    return (
        <Store reducers={reducers}>
            <Component />
        </Store>
    )
}

export default App
```