import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProfileState {
  username: string;
  avatar: string | null;
  history: string[];
  setUsername: (name: string) => void;
  setAvatar: (avatar: string) => void;
  addHistory: (item: string) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      username: "",
      avatar: null,
      history: [],

      setUsername: (name) => set({ username: name }),
      setAvatar: (avatar) => set({ avatar }),
      addHistory: (item) => set((state) => ({ history: [item, ...state.history] })),
    }),
    { name: "coffee-profile" }
  )
);
