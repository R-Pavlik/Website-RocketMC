"use client";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FaDiscord, FaInstagram, FaServer } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { IoMdCloudUpload } from "react-icons/io";
import { initializeApp } from "firebase/app";
import {db} from "../api/firebaseConfig";
import Loader from "../utils/Loader";

// Firebase konfigurace a inicializace
// Mapování názvů ikon na komponenty ikon
const iconMap: { [key: string]: React.ComponentType } = {
  FaDiscord: FaDiscord,
  FaInstagram: FaInstagram,
  FaServer: FaServer,
  IoPeople: IoPeople,
  IoMdCloudUpload: IoMdCloudUpload,
  FaCode: FaCode,
};

interface Features {
  icon: string;
  title: string;
  description: string;
}

export default function FeaturesComponent() {
  const [features, setFeatures] = useState<Features[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Funkce pro načtení dat z Firestore
  const fetchFeatures = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "features"));
      const fetchedFeatures: Features[] = querySnapshot.docs.map((doc) => doc.data() as Features);
      setFeatures(fetchedFeatures);
    } catch (error) {
      console.error("Error fetching features:", error);
    }
    setLoading(false);
  };

  // Načtení dat při prvním renderu komponenty
  useEffect(() => {
    fetchFeatures();
  }, []);
  if (loading) return <Loader />
     
  return (
    <div className="w-screen h-full bg-darkgray">
      <div className="w-screen h-[90px] flex justify-center items-center">
        <h1 className="kanitfont text-4xl text-white">
          Our
          <span
            style={{
              background: "linear-gradient(to right, #F9D436, #E96745)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="kanitfont ml-2"
          >
            Features
          </span>
        </h1>
      </div>

      <div className="w-screen md:h-[330px] h-full flex justify-center items-start">
        <div className="grid md:grid-rows-1 md:grid-cols-4 grid-rows-4 grid-cols-1 gap-4">
          {/* Feature display */}
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon]; // Získání komponenty ikony
            return (
              <div
                key={index}
                className="w-[230px] h-[240px] bg-lightergray flex flex-col items-center justify-center text-white p-4 rounded-xl mt-4 mb-4"
              >
                <div className="text-5xl mb-4">
                  {IconComponent ? <IconComponent /> : "Load error"} {/* Renderování ikony */}
                </div>
                <h2 className="text-2xl mb-2">{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
