/* eslint-disable react/prop-types */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import logo from '../../assets/logo/icons8-reminders-100.png';
import SocialLogin from "../Shared/SocailLogin";

const Login = ({ title }) => {
    const { signIn } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then((result) => {
                Swal.fire({
                    title: `${result.user.displayName} Logged in successfully`,
                    icon: "success",
                    timer: 2000,
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                    timer: 3000,
                });
            });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 text-gray-800">
            <Helmet>
                <title>{title || "Signin | TickTack"}</title>
            </Helmet>

            <div className="text-center my-4">
                <img className="w-16 mx-auto" src={logo} alt="TickTack" />
                <Link to="/" className="text-3xl md:text-4xl font-bold">TickTack</Link>
            </div>

            <div className="my-6 w-full md:w-1/2 lg:w-1/3 mx-auto p-8 rounded-lg shadow-lg border bg-white border-gray-200">
                <h2 className="text-2xl font-bold text-center mb-4">Welcome Back!</h2>
                <p className="text-sm text-center mb-6">Log in to access your account and enjoy our services.</p>

                <SocialLogin />

                <div className="my-6 border-t border-dashed border-gray-300"></div>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* Email Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Your Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^@]+@[^@]+\.[^@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                            className="input input-bordered w-full"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Your Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            className="input input-bordered w-full"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-info w-full">Log In</button>
                </form>

                <p className="font-medium text-center mt-6">
                    Don’t have an account?{' '}
                    <Link to="/register" className="text-indigo-600 hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

