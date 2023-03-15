/** 1.0.4 | www.phoxer.com */
import { useEffect, useState } from 'react';

type TUseFetchExpress = {
    readonly loading: boolean;
    readonly error: any | null;
    readonly result: any | null;
    readonly retry: number;
    readonly retryFetch: () => void;
}

type TData = {
    result: any | null;
    error: any | null;
    loading: boolean;
}

const okStatus = [200,201,202];
const headers = {'Content-Type': 'application/json; charset=UTF-8'};

const useFetchExpress = (url: string, params: any = null, options: any = { method: 'GET' }): TUseFetchExpress => {
    const [data, setData] = useState<TData>({ result: null, error: null, loading: true });
    const [retry, setRetry] = useState<number>(0);

    const retryFetch = () => {
        setData({ result: null, error: null, loading: true });
        setRetry((oldRetry) => {
            return oldRetry + 1;
        })
    }

    const handleError = (e: Response) => {
        const statusText = e.statusText? e.statusText : "Fetch Error";
        const error = e.status? { status: e.status, message: statusText } : { status: 500, message: `${e}` }
        setData({ result: null, error, loading: false });
    }

    useEffect(() => {
        const doFetch = async () => {
            const urlParams = (options.method === 'GET' && params) ? `${url}?${new URLSearchParams(params).toString()}` : url;
            const opts = (options.method === 'GET') ? { headers, ...options } : { headers, ...options, body: JSON.stringify(params)};
            await fetch(urlParams, opts).then((res) => {
                if (res.ok && okStatus.includes(res.status)) {
                    return res.json();
                }
                handleError(res);
                return Promise.reject(res);
            }).then((json) => {
                setData({ result: json, error: null, loading: false });
            }).catch((e: Response) => {
                console.error(e);
                handleError(e);
            });
        }
        doFetch();
    }, [url, retry]);

    return { ...data, retryFetch, retry };
}

export default useFetchExpress;