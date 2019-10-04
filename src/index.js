import React, { useContext } from "react"
import { RootContext } from "./contexts"
import Store from "./Store"

function useStore(key, onlyAction) {
    const [value, action] = useContext(RootContext)[key]
    return useContext(onlyAction ? action : value)
}

export { Store }
export { useStore }