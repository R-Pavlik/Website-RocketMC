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
        <div className="flex flex-col items-center md:justify-center h-screen bg-darkgray">
            <div className='mb-4 mt-12 md:mt-1 flex justify-center items-center flex-col'>
                <img src="rocketmc-logo.png" alt="" className=' w-[128px]'/>
                <h1 className='   kanitfont text-4xl text-white'>LOGIN TO CONTINUE</h1>

            </div>
            <div className="bg-darkergray p-8 rounded-lg shadow-lg md:w-[435px] w-full max-w-md flex justify-center items-center">
                
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-white font-bold mb-2 ml-2 lexendfont">EMAIL:</label>
                        <input
                            type="email"
                            value={email}
                            placeholder='email@example.com'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-[365px] px-3 py-2 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-info focus:border-transparent"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-white font-bold mb-2 ml-2 lexendfont">PASSWORD:</label>
                        <input
                            type="password"
                            value={password}
                            placeholder='Password123'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-[365px] px-3 py-2 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-info focus:border-transparent"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-[210px] py-2 text-white rounded-xl hover:opacity-90 transition duration-100"
                            style={{
                                background: "linear-gradient(to right, #F9D436, #E96745)"
                            }}
                        >
                            Login
                        </button>
                    </div>
                </form>
                {error && <p className="mt-4 text-danger">{error}</p>}
            </div>
        </div>
    );
}
