import React, { createContext, useReducer, useContext, useMemo } from "react"

const Context = createContext()

const Component = React.memo(({ component }) => component)

const Store = React.memo(({ reducers, children }) => {
    const Contexts = useMemo(() => Object.entries(reducers).reduce(addContexts, { Providers: Component, Consumers: {} }), [reducers])

    return (
        <Context.Provider value={Contexts.Consumers}>
            <Contexts.Providers component={children} />
        </Context.Provider>
    )
})

function addContexts(Acc, [key, entry]) {
    const Context = createContext()

    const Providers = React.memo(({ component }) =>
        <Context.Provider value={useReducer(entry.reducer, entry.state)}>
            <Acc.Providers component={component} />
        </Context.Provider>
    )

    const Consumers = { ...Acc.Consumers, [key]: Context }

    return { Providers, Consumers }
}

function useStore(key) {
    const context = useContext(Context)[key]
    return useContext(context)
}

export { Store }
export { useStore }