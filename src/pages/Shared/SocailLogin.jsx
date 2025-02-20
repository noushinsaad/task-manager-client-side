import { FcGoogle } from "react-icons/fc";
import {  useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";


const SocialLogin = () => {
    const axiosPublic = useAxiosPublic();
    const { googleSignIn } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL
                };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `Created your account Successfully, ${result.user.displayName}`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/')
                        }
                        else {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${result.user.displayName} logged in Successfully`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/')
                        }
                    })
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                    timer: 3000,
                });
            });
    }

    return (
        <div className="text-center">
            <button
                onClick={handleGoogleSignIn}
                className="btn btn-outline flex items-center justify-center w-full rounded-md"
            >
                <FcGoogle className="text-2xl" />
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;