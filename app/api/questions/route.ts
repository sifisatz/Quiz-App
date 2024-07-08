import { NextResponse } from 'next/server';
import q from '../../../db/questions.sample';

// Mock function to fetch questions data. Replace this with your actual data fetching logic.
async function fetchQuestions(category: string, limit: number, difficulty: string) {
    // Replace this with your actual logic, for example, fetching from a database.

    // Apply filters based on limit
    return q.slice(0, limit);
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('categories') || 'default';
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const difficulty = searchParams.get('type') || 'easy';
    const questions = await fetchQuestions(category, limit, difficulty);

    return NextResponse.json(questions);
}
