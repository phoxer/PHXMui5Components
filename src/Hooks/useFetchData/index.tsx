import { useEffect, useState } from 'react';

type TUseFetchData<T> = {
    readonly loading: boolean;
    readonly error: Error | null;
    readonly result: T | null;
    readonly fetchData: any;
}

const useFetchData = (url: string, options: any = { headers: {'Content-Type': 'application/json'} }): TUseFetchData<unknown>  => {
    const [result, setResult] = useState<unknown | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const abortController = new AbortController();

    const fetchData = {
        get: async (endPoint: string, params: any = null, callBack?: (data: any) => void) => {
            const urlParams = params ? `${url}${endPoint}?${new URLSearchParams(params).toString()}` : `${url}${endPoint}`;
            setLoading(true);
            try {
                const res = await fetch(urlParams, { ...options, method: 'GET', signal: abortController.signal });
                const jsonData = await res.json();
                if (!abortController.signal.aborted) {
                    if (callBack) {
                        callBack(jsonData);
                    } else { 
                        setResult(jsonData);
                    }
                }
            } catch (e) {
                if (!abortController.signal.aborted) {
                    setError(e as Error);
                }
            } finally {
                if (!abortController.signal.aborted) {
                    setLoading(false);
                }
            }
        },
        post: async (endPoint: string, params: any, callBack?: (data: any) => void) => {
            setLoading(true);
            try {
                const postOptions = { ...options, method: 'POST', signal: abortController.signal, body: JSON.stringify(params) }
                const res = await fetch(`${url}${endPoint}`, postOptions);
                const jsonData = await res.json();
                if (!abortController.signal.aborted) {
                    if (callBack) {
                        callBack(jsonData);
                    } else { 
                        setResult(jsonData);
                    }
                }
            } catch (e) {
                if (!abortController.signal.aborted) {
                    setError(e as Error);
                }
            } finally {
                if (!abortController.signal.aborted) {
                    setLoading(false);
                }
            }
        },
        put: async (endPoint: string, params: any, callBack?: (data: any) => void) => {
            setLoading(true);
            try {
                const postOptions = { ...options, method: 'PUT', signal: abortController.signal, body: JSON.stringify(params) }
                const res = await fetch(`${url}${endPoint}`, postOptions);
                const jsonData = await res.json();
                if (!abortController.signal.aborted) {
                    if (callBack) {
                        callBack(jsonData);
                    } else { 
                        setResult(jsonData);
                    }
                }
            } catch (e) {
                if (!abortController.signal.aborted) {
                    setError(e as Error);
                }
            } finally {
                if (!abortController.signal.aborted) {
                    setLoading(false);
                }
            }
        },
        delete: async (endPoint: string, params: any, callBack?: (data: any) => void) => {
            setLoading(true);
            try {
                const postOptions = { ...options, method: 'DELETE', signal: abortController.signal, body: JSON.stringify(params) }
                const res = await fetch(`${url}${endPoint}`, postOptions);
                const jsonData = await res.json();
                if (!abortController.signal.aborted) {
                    if (callBack) {
                        callBack(jsonData);
                    } else { 
                        setResult(jsonData);
                    }
                }
            } catch (e) {
                if (!abortController.signal.aborted) {
                    setError(e as Error);
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

    return { result, loading, error, fetchData };
}

export default useFetchData;