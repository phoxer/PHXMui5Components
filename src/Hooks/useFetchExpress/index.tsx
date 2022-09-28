import { useEffect, useState } from 'react';

const useFetchExpress = (url: string, params: any = null, options: any = { method: 'GET', headers: {'Content-Type': 'application/json'} }) => {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const doFetch = async () => {
            const urlParams = params ? `${url}?${new URLSearchParams(params).toString()}` : url;
            try {
                const res = await fetch(urlParams, { ...options, signal });
                const json = await res.json();
                if (!signal.aborted) {
                    setData(json);
                }
            } catch (e) {
                if (!signal.aborted) {
                    setError(e);
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        }
        doFetch();
        return () => {
            abortController.abort();
        };
    }, [url]);

    return { data, loading, error };
}

export default useFetchExpress;