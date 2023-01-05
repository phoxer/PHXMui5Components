/** 1.0.3 | www.phoxer.com */
import { useEffect, useState } from 'react';

type TUseFetchData = {
    readonly loading: boolean;
    readonly error: any | null;
    readonly result: any | null;
    readonly fetchData: any;
}

type TData = {
    result: any | null;
    error: any | null;
    loading: boolean;
}

const okStatus = [200,201,202];

const useFetchData = (url: string, options: any = { headers: {'Content-Type': 'application/json'} }): TUseFetchData  => {
    const [data, setData] = useState<TData>({ result: null, error: null, loading: false });
    const abortController = new AbortController();

    const handleError = (e: Response) => {
        const statusText = e.statusText? e.statusText : "Fetch Error";
        const error = e.status? { status: e.status, message: statusText } : { status: 500, message: `${e}` }
        setData({ result: null, error, loading: false });
    }

    const handleResult = (json: any, callBack?: (jsonData: any) => void, preserve: boolean = false) => {
        if (callBack) {
            callBack(json);
            setData({ result: preserve? data.result : null, error: null, loading: false });
        } else {
            setData({ result: json, error: null, loading: false });
        }
    }

    const fetchData = {
        get: async (endPoint: string, params: any = null, callBack?: (data: any) => void, preserve: boolean = false) => {
            const urlParams = params ? `${url}${endPoint}?${new URLSearchParams(params).toString()}` : `${url}${endPoint}`;
            setData({ result: null, error: null, loading: true });
            await fetch(urlParams, { ...options, method: 'GET', signal: abortController.signal }).then((res) => {
                if (res.ok && okStatus.includes(res.status)) {
                    return res.json();
                }
                if (!abortController.signal.aborted) {
                    handleError(res);
                }
                return Promise.reject(res);
            }).then((json) => {
                if (!abortController.signal.aborted && json) {
                    handleResult(json, callBack, preserve);
                }
            }).catch((e: Response) => {
                console.error(e);
                if (!abortController.signal.aborted) {
                    handleError(e);
                }
            });
        },
        post: async (endPoint: string, params: any, callBack?: (data: any) => void, preserve: boolean = false) => {
            setData({ result: null, error: null, loading: true });
            const postOptions = { ...options, method: 'POST', signal: abortController.signal, body: JSON.stringify(params) }
            await fetch(`${url}${endPoint}`, postOptions).then((res) => {
                if (res.ok && okStatus.includes(res.status)) {
                    return res.json();
                }
                if (!abortController.signal.aborted) {
                    handleError(res);
                }
                return Promise.reject(res);
            }).then((json) => {
                if (!abortController.signal.aborted && json) {
                    handleResult(json, callBack, preserve);
                }
            }).catch((e: Response) => {
                console.error(e);
                if (!abortController.signal.aborted) {
                    handleError(e);
                }
            });
        },
        put: async (endPoint: string, params: any, callBack?: (data: any) => void, preserve: boolean = false) => {
            setData({ result: null, error: null, loading: true });
            const postOptions = { ...options, method: 'PUT', signal: abortController.signal, body: JSON.stringify(params) }
            await fetch(`${url}${endPoint}`, postOptions).then((res) => {
                if (res.ok && okStatus.includes(res.status)) {
                    return res.json();
                }
                if (!abortController.signal.aborted) {
                    handleError(res);
                }
                return Promise.reject(res);
            }).then((json) => {
                if (!abortController.signal.aborted && json) {
                    handleResult(json, callBack, preserve);
                }
            }).catch((e: Response) => {
                console.error(e);
                if (!abortController.signal.aborted) {
                    handleError(e);
                }
            });
        },
        delete: async (endPoint: string, params: any, callBack?: (data: any) => void, preserve: boolean = false) => {
            setData({ result: null, error: null, loading: true });
            const postOptions = { ...options, method: 'DELETE', signal: abortController.signal, body: JSON.stringify(params) }
            await fetch(`${url}${endPoint}`, postOptions).then((res) => {
                if (res.ok && okStatus.includes(res.status)) {
                    return res.json();
                }
                if (!abortController.signal.aborted) {
                    handleError(res);
                }
                return Promise.reject(res);
            }).then((json) => {
                if (!abortController.signal.aborted && json) {
                    handleResult(json, callBack, preserve);
                }
            }).catch((e: Response) => {
                console.error(e);
                if (!abortController.signal.aborted) {
                    handleError(e);
                }
            });
        }
    }

    useEffect(() => {
        return () => {
            abortController.abort();
        };
    }, []);

    return { ...data, fetchData };
}

export default useFetchData;