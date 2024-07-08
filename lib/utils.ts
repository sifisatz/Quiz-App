import { basePoints } from "@/db/quizSettings";
import { Difficulty } from "@/types/enums/Diffuculty";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const calculatePoints = (timeTaken: number, difficulty: Difficulty) => {
  const maxTime = 15;
  const maxPoints = basePoints[difficulty];
  const points = ((maxTime - timeTaken) / maxTime) * maxPoints;
  return Math.floor(points); // Round down to the nearest integer
};