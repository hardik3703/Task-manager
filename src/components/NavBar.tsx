'use client'
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FaHome, FaTachometerAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-xl font-bold flex items-center">
                    <FaHome className="mr-2 text-xl" />
                    Notes
                </Link>
                <div className="space-x-4 flex items-center">
                    <Link href="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded flex items-center transition-colors duration-300">
                        <FaHome className="mr-2 text-lg" />
                       Home
                    </Link>
                  {session &&  <Link href="/dashboard" className="text-white hover:bg-gray-700 px-3 py-2 rounded flex items-center transition-colors duration-300">
                        <FaTachometerAlt className="mr-2 text-lg" />
                      DashBoard
                    </Link>}
                    {session && <Link href="/profile" className="text-white hover:bg-gray-700 px-3 py-2 rounded flex items-center transition-colors duration-300">
                        <FaUser className="mr-2 text-lg" />
                        Profile
                    </Link>}
                    {session ? (
                        <button 
                            onClick={() => signOut()} 
                            className="text-white hover:bg-gray-700 px-3 py-2 rounded flex items-center transition-colors duration-300"
                        >
                            <FaSignOutAlt className="mr-2 text-lg" />
                            Sign Out
                        </button>
                    ) : (
                        <Link href="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded flex items-center transition-colors duration-300">
                            <FaSignOutAlt className="mr-2 text-lg" />
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
