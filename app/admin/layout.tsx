"use client";
import React, { useEffect, useState } from 'react';
import { auth } from '../api/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/Navbar';
import { useRouter } from 'next/navigation';
import AdminLoader from '../utils/AdminLoader';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                router.push("/admin/auth"); // Move redirection here
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return <AdminLoader />; // Loading indicator
    }
    return (
        <div>
            <Navbar />
            <div>{children}</div>
        </div>
    );
}
