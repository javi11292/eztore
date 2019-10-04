import React from "react"
import Store from "./Store"

/**
 * @param key State to use
 * @param onlyAction True to get only the dispatcher
 */
declare function useStore(key: string, onlyAction: boolean): [any, Function]

export { Store }
export { useStore }