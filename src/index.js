import React, { createContext, useReducer, useContext, useMemo } from "react"

const ChildrenContext = createContext()

const Context = createContext()

const Children = React.memo(props => useContext(ChildrenContext))

const Store = React.memo(({ reducers, children }) => {

    const Contexts = useMemo(() => Object.entries(reducers).reduce(addContexts, { Providers: Children, Consumers: {} }), [reducers])

    return (
        <ChildrenContext.Provider value={children}>
            <Context.Provider value={Contexts.Consumers}>
                <Contexts.Providers />
            </Context.Provider>
        </ChildrenContext.Provider>
    )
})

function addContexts(Acc, [key, entry]) {
    const Context = createContext()

    const Providers = React.memo(() => (
        <Context.Provider value={useReducer(entry.reducer, entry.state)}>
            <Acc.Providers />
        </Context.Provider>
    ))

    const Consumers = { ...Acc.Consumers, [key]: Context }

    return { Providers, Consumers }
}

function useStore(key) {
    const context = useContext(Context)[key]
    return useContext(context)
}

export { Store }
export { useStore }