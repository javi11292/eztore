import React, { memo } from "react"

function ActionProvider({ Providers, Provider, value }) {
    return (
        <Provider value={value}>
            <Providers />
        </Provider>
    )
}

export default memo(ActionProvider)