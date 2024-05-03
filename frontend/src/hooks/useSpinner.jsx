import { useState } from 'react'
import { SpinnerInfinity } from 'spinners-react'

export default function useSpinner() {
    const [spinnerVisible, setSpinnerVisible] = useState(false)

    const showSpinner = () => {
        setSpinnerVisible(true)
    }

    const hideSpinner = () => {
        setSpinnerVisible(false)
    }

    return {
        spinnerVisible,
        showSpinner,
        hideSpinner,
        spinner
    }

}

export const spinner = (primaryColor, width = 40) => {
    return (
        <SpinnerInfinity size={width} thickness={140} speed={100} color={primaryColor} secondaryColor="rgba(255, 255, 255, 0.7)" />
    )
}