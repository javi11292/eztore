import React, { useContext } from "react"
import { RootContext } from "./contexts"
import Store from "./Store"

function useStore(key, onlyAction) {
    const [Value, Action] = useContext(RootContext)[key]
    return useContext(onlyAction ? Action : Value)
}

export { Store }
export { useStore }