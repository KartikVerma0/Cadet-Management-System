import { createContext, useState } from "react";
import PropTypes from 'prop-types'


const PollContext = createContext({})
export default PollContext

export function PollProvider({ children }) {
    const [polls, setPolls] = useState([])

    return (
        <PollContext.Provider value={{ polls, setPolls }}>
            {children}
        </PollContext.Provider>
    )
}

PollProvider.propTypes = {
    children: PropTypes.node
}