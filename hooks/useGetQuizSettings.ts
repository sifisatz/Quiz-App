
import { ResponseData } from '@/app/api/quiz-settings/route';
import { useEffect, useState } from 'react';
const useGetQuizSettings = () => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL;

    const [data, setData] = useState<ResponseData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/quiz-settings`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result: ResponseData = await response.json();
                setData(result);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [baseUrl]);

    return { data, loading, error };
};

export default useGetQuizSettings;
