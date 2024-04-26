import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close';
import Lottie from 'react-lottie'
import ResponseLottieAnimation from '../../assets/response_animation.json'
import ErrorLottieAnimation from '../../assets/error_animation.json'

import "./MessageModal.css"
import { useEffect } from 'react';



export default function MessageModal({ closeButtonHandler, message, hasError }) {

    const successLottieOptions = {
        loop: true,
        autoplay: true,
        animationData: ResponseLottieAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    const errorLottieOptions = {
        loop: true,
        autoplay: true,
        animationData: ErrorLottieAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    useEffect(() => {
        setTimeout(() => {
            closeButtonHandler(false)
        }, 2800)
    }, [closeButtonHandler])

    return (
        <div className="MessageModal">
            <main>
                {!hasError ?
                    <Lottie options={successLottieOptions}
                        height={400}
                        width={400}
                    />
                    :
                    <Lottie options={errorLottieOptions}
                        height={400}
                        width={400}
                    />
                }
                {message}
            </main>
            <button onClick={() => { closeButtonHandler(false) }}><CloseIcon /></button>
        </div >
    )
}

MessageModal.propTypes = {
    closeButtonHandler: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    hasError: PropTypes.bool.isRequired
}