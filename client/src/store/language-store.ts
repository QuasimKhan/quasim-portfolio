import { create } from "zustand"

import type { BlogLanguage } from "@/types/blog.types"

interface LanguageStore {
    language: BlogLanguage;

    setLanguage: (
        language: BlogLanguage
    ) => void
}


export const useLanguageStore = create<LanguageStore>((set) => ({
    language: "en",
    setLanguage(language) {
        set({ language })
    },
}))