import "./PendingAccountApprovalPage.css";
import Lottie from "react-lottie";
import Navbar from "../../components/navbar/Navbar";
import WaitAnimation from "../../assets/wait_animation.json";

const PendingAccountApprovalPage = () => {
    const waitLottieOptions = {
        loop: true,
        autoplay: true,
        animationData: WaitAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    return (
        <div className='PendingAccountApprovalPage'>
            <Navbar loginType="logout" />
            <main>
                <Lottie options={waitLottieOptions}
                    height={300}
                    width={300}
                />
                <span className="message">
                    <p>Thank you for registering on Chitkara NCC CMS.</p>
                    <p>You will be able to use your account after approval</p>
                </span>
            </main>
        </div>
    );
};
export default PendingAccountApprovalPage;
