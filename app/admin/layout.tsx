"use client";
import React, { useEffect, useState } from 'react';
import { auth } from '../api/firebaseConfig'; // Upravte cestu podle struktury vašeho projektu
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/Navbar';
import LoginScreen from './components/LoginScreen'; // Importujte komponentu přihlašovací stránky

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Nebo nějaký indikátor načítání
    }

    return (
        <div>
            <Navbar />
            {isAuthenticated ? (
                <div>{children}</div> // Zobrazí přehledovou stránku nebo jiné děti
            ) : (
                <LoginScreen /> // Zobrazí přihlašovací stránku
            )}
        </div>
    );
}
