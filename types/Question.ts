import { Category } from "./enums/Category"
import { Difficulty } from "./enums/Diffuculty"

export type Question = {
    category: Category,
    id: string,
    correctAnswer: string,
    incorrectAnswers: string[],
    question: string,
    tags: Tags[],
    type: string,
    difficulty: Difficulty,
    regions: string[],
    isNiche: boolean
}

export type Questions = Question[]