import { useEffect, useState } from 'react';

type TUseFetchExpress<T> = {
    readonly loading: boolean;
    readonly error: Error | null;
    readonly result: T | null;
}

const useFetchExpress = (url: string, params: any = null, options: any = { method: 'GET', headers: {'Content-Type': 'application/json'} }): TUseFetchExpress<unknown> => {
    const [result, setResult] = useState<unknown | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const doFetch = async () => {
            const urlParams = params ? `${url}?${new URLSearchParams(params).toString()}` : url;
            try {
                const res = await fetch(urlParams, { ...options, signal });
                const json = await res.json();
                if (!signal.aborted) {
                    setResult(json);
                }
            } catch (e) {
                if (!signal.aborted) {
                    setError(e as Error);
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

    return { result, loading, error };
}

export default useFetchExpress;