/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import logo from "../../assets/logo/icons8-reminders-100.png";
import SocialLogin from "../Shared/SocailLogin";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?&key=${image_hosting_key}`;

const Register = ({ title }) => {
    const { createUser, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const imageFile = new FormData();
        imageFile.append("image", data.image[0]);

        try {
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { "content-type": "multipart/form-data" },
            });

            const photoUrl = res.data.data.display_url;

            await createUser(data.email, data.password);
            await updateUserProfile(data.name, photoUrl);

            const userInfo = { name: data.name, email: data.email, photoUrl };
            const response = await axiosPublic.post("/users", userInfo);

            if (response.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User Created Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "User already exists",
                    icon: "error",
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
                timer: 3000,
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 ">
            <Helmet>
                <title>{title || "Register | TickTack"}</title>
            </Helmet>

            <div className="text-center my-4">
                <img className="w-16 mx-auto" src={logo} alt="TickTack" />
                <Link to="/" className="text-3xl md:text-4xl font-bold text-gray-900">
                    TickTack
                </Link>
            </div>

            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-2xl font-semibold text-center text-gray-800  mb-6">
                    Create Your Account
                </h2>




                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Your Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="input input-bordered  "
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Your Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered "
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^@]+@[^@]+\.[^@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Your Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            className="input input-bordered "
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,15}$/,
                                    message: "Password must be 6-15 characters with uppercase, lowercase, and a number.",
                                },
                            })}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Profile Picture */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Upload Profile Picture</span>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="file-input file-input-bordered w-full "
                            {...register("image", {
                                required: "Profile picture is required",
                                validate: {
                                    isImage: (fileList) => {
                                        const file = fileList?.[0];
                                        if (!file) return "Please upload a file.";
                                        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
                                        return validTypes.includes(file.type) ? true : "Only JPEG, PNG, or JPG files are allowed.";
                                    },
                                },
                            })}
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                    </div>

                    <button type="submit" className="btn btn-outline w-full">Register</button>
                </form>
                <div className="divider my-6">OR</div>
                <SocialLogin />

                <p className="text-center text-gray-700  mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary font-medium hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;