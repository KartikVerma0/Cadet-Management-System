import Navbar from '../../components/navbar/Navbar'
import './FourOFourPage.css'

export default function FourOFourPage() {
    return (
        <div className='FourOFour'>
            <Navbar loginType='login' />
            <section>
                <span className='errorCode'><span>4</span><span>0</span><span>4</span></span>
                <p><span>Oops! You&apos;ve wandered into the void. Our servers seem to be playing hide  and seek.</span><span> While we locate the missing page, how about a game of digital  hide and seek?</span><span> Count to 404 and see if you find what you&apos;re looking  for!</span></p>
            </section>
        </div>
    )
}