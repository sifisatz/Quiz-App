import { Option } from "@/types/Option";
import { Category } from "@/types/enums/Category";
import { Difficulty } from "@/types/enums/Diffuculty";

export const difficultyOptions: Option<Difficulty>[] = [
    {
        value: Difficulty.Easy,
        option: "Easy",
    },
    {
        value: Difficulty.Medium,
        option: "Medium",
    },
    {
        value: Difficulty.Hard,
        option: "Hard",
    },
];

// Base points for each difficulty level
export const basePoints = {
    [Difficulty.Easy]: 50,
    [Difficulty.Medium]: 100,
    [Difficulty.Hard]: 150,
};

export const categoryOptions: Option<Category>[] = [
    {
        value: Category.GeneralKnowledge,
        option: "General Knowledge",
    },
    {
        value: Category.ArtsAndLiterature,
        option: "Arts & Literature",
    },
    {
        value: Category.FilmAndTV,
        option: "Film & TV",
    },
    {
        value: Category.FoodAndDrink,
        option: "Food & Drink",
    },
    {
        value: Category.SocietyAndCulture,
        option: "Society & Culture",
    },
    {
        value: Category.Geography,
        option: "Geography",
    },
    {
        value: Category.History,
        option: "History",
    },
    {
        value: Category.Music,
        option: "Music",
    },
    {
        value: Category.SportAndLeisure,
        option: "Sport & Leisure",
    },
    {
        value: Category.Science,
        option: "Science",
    },
];
