import React from "react"

export interface StoreProps {
    reducers: {
        [key: string]: {
            state: any,
            reducer: (state: any, action: any) => any
        }
    }
}

declare const Store: React.ComponentType<StoreProps>

export default Store
