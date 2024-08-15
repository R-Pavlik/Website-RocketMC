"use client"; // Označení komponenty jako klientské

import React, { useState, useEffect } from "react";
import { db } from "../../api/firebaseConfig"; // Importujte vaši konfiguraci Firebase
import { collection, getDocs } from "firebase/firestore";

// Definice typu pro člena týmu
interface TeamMember {
  rank: string;
  nick: string;
  skin: string;
  prefixcolor: string;
}

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const collectionRef = collection(db, "team");
        const querySnapshot = await getDocs(collectionRef);
        const membersArray: TeamMember[] = querySnapshot.docs.map(
          (doc) => doc.data() as TeamMember
        );

        setTeamMembers(membersArray);
      } catch (error) {
        console.error("Chyba při načítání členů týmu: ", error);
        setError("Chyba při načítání členů týmu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className=" w-screen h-screen flex justify-center items-start bg-darkgray">
        <div className="w-[10%] h-[10%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <circle
              fill="#E96745"
              stroke="#E96745"
              stroke-width="8"
              r="15"
              cx="40"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.4"
              ></animate>
            </circle>
            <circle
              fill="#E96745"
              stroke="#E96745"
              stroke-width="8"
              r="15"
              cx="100"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.2"
              ></animate>
            </circle>
            <circle
              fill="#E96745"
              stroke="#E96745"
              stroke-width="8"
              r="15"
              cx="160"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="0"
              ></animate>
            </circle>
          </svg>
        </div>
      </div>
    );

  if (error) {
    return (
      <div className="bg-darkgray w-screen h-full">
        <div className=" w-screen h-screen flex justify-center items-start bg-darkgray">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-darkgray text-white p-4 overflow-x-hidden">
      <div className="w-screen h-[90px] flex justify-center items-center">
        <h1 className="kanitfont text-4xl text-white">MANAGEMENT TEAM</h1>
      </div>
      <div className="w-full flex flex-wrap justify-center gap-4">
        {teamMembers.length > 0 ? (
          teamMembers.map((member, index) => (
            <div
              className="w-[210px] h-[245px] text-white rounded-xl text-xl flex flex-col justify-start items-center bg-darkergray"
              key={index}
            >
              <div className="w-full h-[150px] rounded-t-xl flex justify-center items-center">
                <img src={member.skin} alt="" className="w-[130px]" />
              </div>

              <div className="w-full h-[80px] rounded-b-xl flex flex-col justify-center items-center">
                <h1 className="text-3xl kanitfont">{member.nick}</h1>
                <div
                  className="max-w h-[30px] rounded-xl px-3 flex justify-center items-center"
                  style={{ backgroundColor: member.prefixcolor }}
                >
                  <h1 className="lexendfont">{member.rank}</h1>
                </div>
              </div>
            </div>
          ))
        ) : (
            <div className="w-screen h-full text-white flex justify-center items-center">No members found</div>
        )}
      </div>
      <div className="w-screen h-[90px] flex justify-center items-center">
        <h1 className="kanitfont text-4xl text-white">SUPPORT TEAM</h1>
      </div>
      <div className="w-full flex flex-wrap justify-center gap-4">
        {teamMembers.length > 0 ? (
          teamMembers.map((member, index) => (
            <div
              className="w-[210px] h-[245px] text-white rounded-xl text-xl flex flex-col justify-start items-center bg-darkergray"
              key={index}
            >
              <div className="w-full h-[150px] rounded-t-xl flex justify-center items-center">
                <img src={member.skin} alt="" className="w-[130px]" />
              </div>

              <div className="w-full h-[80px] rounded-b-xl flex flex-col justify-center items-center">
                <h1 className="text-3xl kanitfont">{member.nick}</h1>
                <div
                  className="max-w h-[30px] rounded-xl px-3 flex justify-center items-center"
                  style={{ backgroundColor: member.prefixcolor }}
                >
                  <h1 className="lexendfont">{member.rank}</h1>
                </div>
              </div>
            </div>
          ))
        ) : (
            <div className="w-screen h-full text-white flex justify-center items-center">No members found</div>
        )}
      </div>
      <div className="w-screen h-[90px] flex justify-center items-center">
        <h1 className="kanitfont text-4xl text-white">BUILDER TEAM</h1>
      </div>
      <div className="w-full flex flex-wrap justify-center gap-4">
        {teamMembers.length > 0 ? (
          teamMembers.map((member, index) => (
            <div
              className="w-[210px] h-[245px] text-white rounded-xl text-xl flex flex-col justify-start items-center bg-darkergray"
              key={index}
            >
              <div className="w-full h-[150px] rounded-t-xl flex justify-center items-center">
                <img src={member.skin} alt="" className="w-[130px]" />
              </div>

              <div className="w-full h-[80px] rounded-b-xl flex flex-col justify-center items-center">
                <h1 className="text-3xl kanitfont">{member.nick}</h1>
                <div
                  className="max-w h-[30px] rounded-xl px-3 flex justify-center items-center"
                  style={{ backgroundColor: member.prefixcolor }}
                >
                  <h1 className="lexendfont">{member.rank}</h1>
                </div>
              </div>
            </div>
          ))
        ) : (
            <div className="w-screen h-full text-white flex justify-center items-center">No members found</div>
        )}
      </div>
    </div>
  );
}
