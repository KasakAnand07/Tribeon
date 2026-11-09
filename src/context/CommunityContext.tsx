
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CommunityContextType = {
  joinedCommunities: string[];
  isJoined: (communityName: string) => boolean;
  toggleJoin: (communityName: string) => void;
  isLoading: boolean;
};

const CommunityContext = createContext<CommunityContextType | undefined>(
  undefined
);

const STORAGE_KEY = "tribeon_joined_communities";

const initialJoinedCommunities = [
  "React Developers",
  "DSA Study Circle",
];

export function CommunityProvider({ children }: { children: ReactNode }) {
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>(
    initialJoinedCommunities
  );
  const [isLoading, setIsLoading] = useState(true);

  // Load saved communities when the app starts
  useEffect(() => {
    const loadCommunities = async () => {
      try {
        const savedCommunities = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedCommunities !== null) {
          setJoinedCommunities(JSON.parse(savedCommunities));
        }
      } catch (error) {
        console.error("Failed to load joined communities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCommunities();
  }, []);

  // Save whenever joined communities change, after initial loading
  useEffect(() => {
    if (isLoading) return;

    const saveCommunities = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(joinedCommunities)
        );
      } catch (error) {
        console.error("Failed to save joined communities:", error);
      }
    };

    saveCommunities();
  }, [joinedCommunities, isLoading]);

  const isJoined = (communityName: string) => {
    return joinedCommunities.includes(communityName);
  };

  const toggleJoin = (communityName: string) => {
    setJoinedCommunities((previous) =>
      previous.includes(communityName)
        ? previous.filter((name) => name !== communityName)
        : [...previous, communityName]
    );
  };

  return (
    <CommunityContext.Provider
      value={{
        joinedCommunities,
        isJoined,
        toggleJoin,
        isLoading,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunities() {
  const context = useContext(CommunityContext);

  if (!context) {
    throw new Error("useCommunities must be used inside CommunityProvider");
  }

  return context;
}
