'use client'
import { useSession, signOut } from 'next-auth/react';
import { FaUser, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
    const { data: session } = useSession();

    // Handle sign out
    const handleSignOut = () => {
        signOut();
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-3xl font-bold mb-4 text-gray-800">Profile</h1>
                    
                    {session?.user ? (
                        <>
                            <div className="flex items-center mb-6">
                                <FaUser className="text-gray-500 w-6 h-6 mr-4" />
                                <div>
                                    <p className="text-lg font-semibold text-gray-700">Name</p>
                                    <p className="text-gray-600">{session.user.name || 'No name available'}</p>
                                </div>
                            </div>

                            <div className="flex items-center mb-6">
                                <FaEnvelope className="text-gray-500 w-6 h-6 mr-4" />
                                <div>
                                    <p className="text-lg font-semibold text-gray-700">Email</p>
                                    <p className="text-gray-600">{session.user.email || 'No email available'}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleSignOut}
                                className="flex items-center mt-6 py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                            >
                                <FaSignOutAlt className="w-5 h-5 mr-2" />
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <p className="text-gray-600">Loading user data...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
