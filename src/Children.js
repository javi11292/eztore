import React, { memo, useContext } from "react"
import { ChildrenContext } from "./contexts"

function Children() {
    return useContext(ChildrenContext)
}

export default memo(Children)