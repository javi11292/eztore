import React, { useContext } from "react"
import { ChildrenContext } from "./contexts"

const Children = React.memo(props => useContext(ChildrenContext))

export default Children