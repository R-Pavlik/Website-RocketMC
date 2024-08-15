"use client"; // Označení komponenty jako klientské

import { useRouter } from 'next/navigation'; // Import z next/navigation

export default function Page() {
  const router = useRouter();

    return router.push("/blog")
}
