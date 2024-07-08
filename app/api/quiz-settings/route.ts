import { categoryOptions, difficultyOptions } from '@/db/quizSettings';
import { Option } from '@/types/Option';
import { Category } from '@/types/enums/Category';
import { Difficulty } from '@/types/enums/Diffuculty';
import type { NextApiRequest, NextApiResponse } from 'next';

export type ResponseData = {
    difficultyOptions: Option<Difficulty>[];
    categoryOptions: Option<Category>[];
};

export const GET = (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {

    return Response.json({ difficultyOptions, categoryOptions })
};
