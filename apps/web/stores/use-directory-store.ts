import { create } from "zustand";

type DirectoryState = {
  compareSlugs: string[];
  bookmarkedSlugs: string[];
  toggleCompare: (slug: string) => void;
  toggleBookmark: (slug: string) => void;
};

export const useDirectoryStore = create<DirectoryState>((set) => ({
  compareSlugs: [],
  bookmarkedSlugs: [],
  toggleCompare: (slug) =>
    set((state) => ({
      compareSlugs: state.compareSlugs.includes(slug)
        ? state.compareSlugs.filter((item) => item !== slug)
        : [...state.compareSlugs, slug].slice(0, 6)
    })),
  toggleBookmark: (slug) =>
    set((state) => ({
      bookmarkedSlugs: state.bookmarkedSlugs.includes(slug)
        ? state.bookmarkedSlugs.filter((item) => item !== slug)
        : [...state.bookmarkedSlugs, slug]
    }))
}));

