import { useEffect, useState } from 'react';

const useFetchData = (url: string, options: any = { headers: {'Content-Type': 'application/json'} }) => {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>();
    const abortController = new AbortController();

    const fetchData = {
        get: async (endPoint: string, params: any = null) => {
            const urlParams = params ? `${url}${endPoint}?${new URLSearchParams(params).toString()}` : `${url}${endPoint}`;
            try {
                const res = await fetch(urlParams, { ...options, method: 'GET', signal: abortController.signal });
                const jsonData = await res.json();
                if (!abortController.signal.aborted) {
                    setData(jsonData);
                }
            } catch (e) {
                if (!abortController.signal.aborted) {
                    setError(e);
                }
            } finally {
                if (!abortController.signal.aborted) {
                    setLoading(false);
                }
            }
        },
        post: async (endPoint: string, params: any) => {
            try {
                const postOptions = { ...options, method: 'POST', signal: abortController.signal, body: JSON.stringify(params) }
                const res = await fetch(`${url}${endPoint}`, postOptions);
                const jsonData = await res.json();
                if (!abortController.signal.aborted) {
                    setData(jsonData);
                }
            } catch (e) {
                if (!abortController.signal.aborted) {
                    setError(e);
                }
            } finally {
                if (!abortController.signal.aborted) {
                    setLoading(false);
                }
            }
        }
    }

    useEffect(() => {
        return () => {
            abortController.abort();
        };
    }, []);

    return { data, loading, error, fetchData };
}

export default useFetchData;