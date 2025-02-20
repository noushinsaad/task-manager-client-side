import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

const Settings = () => {
    const { user } = useAuth()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            {/* Page Header */}
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
                <p className="text-gray-600">Manage your account settings and preferences.</p>
            </div>

            {/* Profile Settings Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h3>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            defaultValue={user.displayName}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            readOnly
                            defaultValue={user.email}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                            defaultValue="I'm a software developer passionate about building amazing products."
                            rows={3}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
                    >
                        Save Changes
                    </button>
                </form>
            </div>

            {/* Security Settings Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Security</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Change Password</label>
                        <input
                            type="password"
                            placeholder="New Password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
                    >
                        Update Password
                    </button>
                </div>
            </div>

            {/* Notification Settings Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Notifications</h3>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="email-notifications"
                            defaultChecked
                            className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
                        />
                        <label htmlFor="email-notifications" className="ml-2 text-sm text-gray-700">
                            Email Notifications
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="push-notifications"
                            defaultChecked
                            className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
                        />
                        <label htmlFor="push-notifications" className="ml-2 text-sm text-gray-700">
                            Push Notifications
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="sms-notifications"
                            className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
                        />
                        <label htmlFor="sms-notifications" className="ml-2 text-sm text-gray-700">
                            SMS Notifications
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
                    >
                        Save Preferences
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Settings;