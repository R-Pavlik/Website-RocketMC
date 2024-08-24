"use client";
import React from 'react';
import { auth } from '../../api/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.setItem('isAuthenticated', 'false'); // Nastavení stavu přihlášení na false
        router.push('/admin/auth'); // Přesměrování na úvodní stránku nebo přihlašovací stránku
      })
      .catch((error) => {
        console.error('Chyba při odhlašování: ', error);
      });
  };

  return (
    <div className='w-screen h-screen bg-darkgray flex flex-col items-center justify-center'>
      <h1 className='text-white mb-4'>Vítejte!</h1>
      <button
        onClick={handleLogout}
        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
      >
        Odhlásit se
      </button>
    </div>
  );
}
