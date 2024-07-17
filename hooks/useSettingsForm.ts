import { create } from 'zustand';

interface FormState {
    name: string;
    category: string;
    difficulty: string;
    limit: number[];
    setName: (name: string) => void;
    setCategory: (category: string) => void;
    setDifficulty: (difficulty: string) => void;
    setLimit: (limit: number[]) => void;
    resetSettingFormValues: () => void
}

const useSettingsForm = create<FormState>((set) => ({
    name: "",
    category: "",
    difficulty: "",
    limit: [10],
    setName: (name) => set({ name }),
    setCategory: (category) => set({ category }),
    setDifficulty: (difficulty) => set({ difficulty }),
    setLimit: (limit) => set({ limit }),
    resetSettingFormValues: () => set({
        name: "",
        category: "",
        difficulty: "",
        limit: [10],
    }),
}));

export default useSettingsForm;
