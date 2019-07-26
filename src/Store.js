import React, { createContext, useMemo, useReducer } from "react"
import { ChildrenContext, RootContext } from "./contexts"
import Children from "./Children"
import ActionProvider from "./ActionProvider"

function addContexts(Acc, [key, entry]) {
    const ValueContext = createContext()
    const ActionContext = createContext()

    const Providers = React.memo(() => {
        const reducer = useReducer(entry.reducer, entry.state)

        return (
            <ValueContext.Provider value={reducer}>
                <ActionProvider
                    Providers={Acc.Providers}
                    Provider={ActionContext.Provider}
                    value={reducer[1]} />
            </ValueContext.Provider>
        )
    })

    const contexts = { ...Acc.contexts, [key]: [ValueContext, ActionContext] }

    return { Providers, contexts }
}

const Store = React.memo(({ reducers, children }) => {

    const { Providers, contexts } = useMemo(() => Object.entries(reducers).reduce(addContexts, { Providers: Children, contexts: {} }), [reducers])

    return (
        <ChildrenContext.Provider value={children}>
            <RootContext.Provider value={contexts}>
                <Providers />
            </RootContext.Provider>
        </ChildrenContext.Provider>
    )
})

export default Store