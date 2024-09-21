'use client'
import Link from "next/link";
import { FaEdit, FaListAlt, FaCalendarAlt } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <section className="bg-blue-600 text-white py-20">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Note Management App</h1>
                    <p className="text-lg mb-8">Organize your notes efficiently with ease and stay productive.</p>
                    <Link href="/dashboard" className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                        Get Started
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-12">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <FaEdit className="text-blue-600 text-4xl mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold mb-2">Create Notes</h3>
                            <p className="text-gray-600">Easily create and manage your notes with a simple and intuitive interface.</p>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <FaListAlt className="text-blue-600 text-4xl mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold mb-2">Organize</h3>
                            <p className="text-gray-600">Categorize your notes, add tags, and filter them to stay organized and focused.</p>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <FaCalendarAlt className="text-blue-600 text-4xl mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold mb-2">Set Deadlines</h3>
                            <p className="text-gray-600">Keep track of important deadlines by setting due dates for your notes.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="bg-gray-200 py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-lg mb-8">Join us today and start organizing your notes like never before.</p>
                    <Link href="/register" className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                        Sign Up
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
