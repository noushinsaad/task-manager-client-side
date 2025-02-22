import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/icons8-reminders-50.png";


const NavBar = () => {
    const { user, logOut } = useAuth();

    const handleSignOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user?.displayName} logged out successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="navbar bg-green-100 fixed top-0 left-0 right-0 z-50 px-6">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost text-xl flex justify-center items-center">
                    <img src={logo} alt="" />
                    TickTack</Link>
            </div>
            <div className="flex justify-center items-center gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                {
                    user ?
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt={user.displayName}
                                        src={user?.photoURL} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a onClick={handleSignOut}>Logout</a></li>
                            </ul>
                        </div> :
                        <Link to='/login'>
                            <button className="btn btn-accent">Login/Register</button>
                        </Link>
                }
            </div>
        </div>
    );
};

export default NavBar;