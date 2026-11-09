import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Post = {
  id: string;
  intention: string;
  title: string;
  description: string;
  category: string;
  author: string;
  createdAt: string;
  likes: number;
};

type PostContextType = {
  posts: Post[];
  addPost: (
    post: Omit<Post, "id" | "author" | "createdAt" | "likes">
  ) => void;
  isLoading: boolean;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

const STORAGE_KEY = "tribeon_posts";

export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const savedPosts = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedPosts !== null) {
          const parsedPosts: unknown = JSON.parse(savedPosts);

          if (Array.isArray(parsedPosts)) {
            setPosts(parsedPosts as Post[]);
          }
        }
      } catch (error) {
        console.error("Failed to load posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const savePosts = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      } catch (error) {
        console.error("Failed to save posts:", error);
      }
    };

    savePosts();
  }, [posts, isLoading]);

  const addPost = (
    post: Omit<Post, "id" | "author" | "createdAt" | "likes">
  ) => {
    const newPost: Post = {
      ...post,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      author: "You",
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    setPosts((previous) => [newPost, ...previous]);
  };

  return (
    <PostContext.Provider value={{ posts, addPost, isLoading }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("usePosts must be used inside PostProvider");
  }

  return context;
}
