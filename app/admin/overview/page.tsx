"use client";
import React from 'react';
import { auth } from '../../api/firebaseConfig'
import { signOut } from 'firebase/auth';

export default function Page() {
  const handleLogout = () => {
    signOut(auth).then(() => {
      // Uživateli se úspěšně podařilo se odhlásit.
      console.log('Odhlášení proběhlo úspěšně');
    }).catch((error) => {
      // Nastala chyba při odhlašování.
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
