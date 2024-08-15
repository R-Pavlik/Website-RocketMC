"use client";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FaDiscord, FaInstagram, FaServer } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { IoMdCloudUpload } from "react-icons/io";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../api/firebaseConfig";

// Firebase konfigurace a inicializace
initializeApp(firebaseConfig);
const db = getFirestore();

// Mapování názvů ikon na komponenty ikon
const iconMap: { [key: string]: React.ComponentType } = {
  FaDiscord: FaDiscord,
  FaInstagram: FaInstagram,
};

interface Contacts {
  icon: string;
  title: string;
  link: string;
}

export default function contactComponent() {
  const [contact, setcontact] = useState<Contacts[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Funkce pro načtení dat z Firestore
  const fetchcontact = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const fetchedcontact: Contacts[] = querySnapshot.docs.map((doc) => doc.data() as Contacts);
      setcontact(fetchedcontact);
    } catch (error) {
      console.error("Error fetching contact:", error);
    }
    setLoading(false);
  };

  // Načtení dat při prvním renderu komponenty
  useEffect(() => {
    fetchcontact();
  }, []);
  if (loading) return <div className=' w-screen h-[330px] flex flex-col justify-start items-center bg-darkgray'>

    <div className='w-[10%] h-[10%]'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#E96745" stroke="#E96745" stroke-width="8" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#E96745" stroke="#E96745" stroke-width="8" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#E96745" stroke="#E96745" stroke-width="8" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg></div></div>;
  return (
    <div className="w-screen h-full bg-darkgray">

      <div className="w-screen md:h-[330px] h-full flex justify-center items-start">
        <div className="grid md:grid-rows-1 md:grid-cols-2 grid-rows-2 grid-cols-1 gap-4">
          {/* contact display */}
          {contact.map((contact, index) => {
            const IconComponent = iconMap[contact.icon]; // Získání komponenty ikony
            return (
                <a href={contact.link}>
              <div
                key={index}
                className="w-[230px] h-[240px] bg-lightergray flex flex-col items-center justify-center text-white p-4 rounded-xl mt-4 mb-4"
              >
                <div className="text-5xl mb-4">
                  {IconComponent ? <IconComponent /> : "Load error"} {/* Renderování ikony */}
                </div>
                <h2 className="text-2xl mb-2">{contact.title}</h2>
              </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
