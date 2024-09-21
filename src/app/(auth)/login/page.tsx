'use client'
import { getProviders, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/components/loader/Loading";

const SignInPage = () => {
    const [providers, setProviders] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProviders = async () => {
            const providers = await getProviders();
            setProviders(providers);
        };
        fetchProviders();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            const result = await signIn("credentials", {
                redirect: true,
                email,
                password,
            });

            toast.success("Successfully sign in")
            console.log(result);

            if (result?.error) {
                setError(result.error);
            } else if (result?.ok) {
                router.push('/dashboard'); 
            }
            setLoading(false);
        } catch (err) {
            setError("An error occurred during sign-in.");
            setLoading(false);
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <Toaster/>
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg border border-gray-200">
                <h1 className="text-3xl font-semibold mb-6 text-gray-800">Sign In</h1>
                
                {error && <p className="text-red-500 mb-4">{error}</p>}

                {loading && <Loading/>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot your password?</a>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
