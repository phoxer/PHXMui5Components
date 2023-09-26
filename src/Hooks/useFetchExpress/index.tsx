/** 1.0.5 | www.phoxer.com */
import { useEffect, useState } from 'react';
import { isEmpty } from 'ramda';

type TUseFetchExpress = {
    readonly loading: boolean;
    readonly error: any | null;
    readonly result: any | null;
    readonly headers: any | null;
    readonly retry: number;
    readonly retryFetch: () => void;
}

type TError = {
    status: number;
    message: string;
}

type TData = {
    result: any | null;
    error: any | null;
    loading: boolean;
    headers: any | null;
}

export type TCallBack = {
    result: any | null;
    error: TError | null;
    headers: any | null;
}

const headers = {'Content-Type': 'application/json; charset=UTF-8'};
const defaultResponse = { result: null, error: null, headers: null, loading: false };

const useFetchExpress = (url: string, params: any = null, options: any = { method: 'GET' }): TUseFetchExpress => {
    const [data, setData] = useState<TData>(defaultResponse);
    const [retry, setRetry] = useState<number>(0);

    const retryFetch = () => {
        setData({ ...defaultResponse, loading: true });
        setRetry((oldRetry) => {
            return oldRetry + 1;
        })
    }

    const handleError = (e: Response) => {
        const statusText = !isEmpty(e.statusText)? e.statusText : `Fetch Error (${e.status})`;
        const error = !isEmpty(e.status)? { status: e.status, message: statusText } : { status: 500, message: `${e}` }
        setData({ result: null, error, headers: e.headers, loading: false });
    }

    useEffect(() => {
        const doFetch = async () => {
            const urlParams = (options.method === 'GET' && params) ? `${url}?${new URLSearchParams(params).toString()}` : url;
            const opts = (options.method === 'GET') ? { headers, ...options } : { headers, ...options, body: JSON.stringify(params)};
            await fetch(urlParams, opts).then(async (res) => {
                if(res.ok) {
                    return await res.json().then(json => {
                        return {
                            result: json,
                            headers: Object.fromEntries(res.headers.entries())
                        }
                    });
                }
                return Promise.reject(res);
            }).then(({ result, headers }) => {
                setData({ result, error: null, headers, loading: false });
            }, (res: Response) => {
                handleError(res);
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