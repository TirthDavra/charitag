"use client";
import React, { createContext, useContext, useState } from "react";

const ProfileContext = createContext<any>(null);

export const ProfileProvider = ({ children }: any) => {
//   const initialState = {
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//   };
  const [profileData, setProfileData] = useState("Tirth");

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);
