import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type ProfileData = {
  name: string;
  username: string;
  bio: string;
  skills: string[];
  interests: string[];
};

const initialProfile: ProfileData = {
  name: "Your Name",
  username: "yourusername",
  bio: "Developer | MCA Graduate | Interested in building meaningful products and connecting with people.",
  skills: ["Java", "React", "JavaScript", "Spring Boot", "MongoDB"],
  interests: [
    "Technology",
    "Startups",
    "Reading",
    "Problem Solving",
    "Travel",
  ],
};

type ProfileContextType = {
  profile: ProfileData;
  updateProfile: (data: ProfileData) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);

  const updateProfile = (data: ProfileData) => {
    setProfile(data);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }

  return context;
}