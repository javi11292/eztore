import React from "react"

const ActionProvider = React.memo(({ Providers, Provider, value }) => (
    <Provider value={value}>
        <Providers />
    </Provider>
))

export default ActionProvider