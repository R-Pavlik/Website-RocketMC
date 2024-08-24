// app/components/LoginScreen.tsx

"use client"; // Ujistěte se, že komponenta je klientská

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../api/firebaseConfig'; // Upravte cestu podle struktury vašeho projektu

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Přesměrování nebo jiné akce po úspěšném přihlášení mohou být přidány zde
        } catch (error) {
            setError('Failed to login. Please check your credentials.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-light">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-dark">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-dark mb-2">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-info focus:border-transparent"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-dark mb-2">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-info focus:border-transparent"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-info text-white rounded hover:bg-info-dark transition duration-300"
                    >
                        Login
                    </button>
                </form>
                {error && <p className="mt-4 text-danger">{error}</p>}
            </div>
        </div>
    );
}
