import React, { createContext, useReducer, useContext } from "react"

const Context = createContext()

const Component = React.memo(({ component }) => component)

const Store = React.memo(
    /**
     * @param {object} props
     * @param {object} props.reducers Reducers to update store
     */
    ({ reducers, children }) => {
        const Contexts = Object.entries(reducers).reduce(addContexts, { Providers: Component, Consumers: {} })

        return (
            <Context.Provider value={Contexts.Consumers}>
                <Contexts.Providers component={children} />
            </Context.Provider>
        )
    }
)

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

/**
 * @param {string} key Reducer we want to use
 */
function useStore(key) {
    const context = useContext(Context)[key]
    return useContext(context)
}

export { Store }
export { useStore }