"use client";
import { create } from "zustand";

type IdeaType = {
  title: string;
  content: string;
  timestamp: string;
};

interface IdeaState {
  idea: IdeaType;
  setIdea: (title: string, content: string, timestamp: string) => void;
  ideas: IdeaType[];
  setIdeas: (ideas: IdeaType[]) => void;
}

const useIdeaStore = create<IdeaState>((set) => ({
  idea: {
    title: "",
    content: "",
    timestamp: "",
  },
  setIdea: (title, content, timestamp) =>
    set({ idea: { title, content, timestamp } }),
  ideas: [],
  setIdeas: (ideas) => set({ ideas }),
}));

export default useIdeaStore;
