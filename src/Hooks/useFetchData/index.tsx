/** 1.0.5 | www.phoxer.com */
import { useState } from 'react';
import { isEmpty } from 'ramda';

type TUseFetchData = {
    readonly loading: boolean;
    readonly error: any | null;
    readonly result: any | null;
    readonly headers: any | null;
    readonly fetchData: any;
}

type TError = {
    status: number;
    message: string;
}

type TData = {
    result: any | null;
    error: TError | null;
    headers: any | null;
    loading: boolean;
}

export type TCallBack = {
    result: any | null;
    error: TError | null;
    headers: any | null;
}

type TResponse = {
    result: any;
    headers: any;
}

const headers = {'Content-Type': 'application/json; charset=UTF-8'};
const defaultResponse = { result: null, error: null, headers: null, loading: false };

const useFetchData = (url: string, options: any = {}): TUseFetchData  => {
    const [data, setData] = useState<TData>(defaultResponse);

    const handleError = (e: Response, callBack?: (response: TCallBack) => void) => {
        const statusText = !isEmpty(e.statusText)? e.statusText : `Fetch Error (${e.status})`;
        const error = !isEmpty(e.status)? { status: e.status, message: statusText } : { status: 500, message: `${e}` }
        if (callBack) {
            callBack({ result: null, error, headers: e.headers });
        }
        setData({ result: null, error, headers: e.headers, loading: false });
    }

    const handleResult = ({ result, headers }: TResponse, callBack?: (response: TCallBack) => void) => {
        if (callBack) {
            callBack({ result, headers, error: null });
            setData({ result, error: null, headers, loading: false });
        } else {
            setData({ result, error: null, headers, loading: false });
        }
    }

    const fetchData = {
        get: async (endPoint: string, params: any = null, callBack?: (response: TCallBack) => void) => {
            const urlParams = params ? `${url}${endPoint}?${new URLSearchParams(params).toString()}` : `${url}${endPoint}`;
            setData({ ...defaultResponse , loading: true });
            await fetch(urlParams, { headers, ...options, method: 'GET' }).then(async (res) => {
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
                handleResult({ result, headers }, callBack);
            }, (res: Response) => {
                handleError(res, callBack);
            }).catch((e: Response) => {
                console.error(e);
                handleError(e, callBack);
            });
        },
        post: async (endPoint: string, params: any, callBack?: (response: TCallBack) => void) => {
            setData({ ...defaultResponse , loading: true });
            const body = JSON.stringify(params);
            const postOptions = { headers, ...options, method: 'POST', body }
            await fetch(`${url}${endPoint}`, postOptions).then(async (res) => {
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
                handleResult({ result, headers }, callBack);
            }, (res: Response) => {
                handleError(res, callBack);
            }).catch((e: Response) => {
                console.error(e);
                handleError(e, callBack);
            });
        },
        put: async (endPoint: string, params: any, callBack?: (response: TCallBack) => void) => {
            setData({ ...defaultResponse , loading: true });
            const body = JSON.stringify(params);
            const postOptions = { headers, ...options, method: 'PUT', body }
            await fetch(`${url}${endPoint}`, postOptions).then(async (res) => {
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
                handleResult({ result, headers }, callBack);
            }, (res: Response) => {
                handleError(res, callBack);
            }).catch((e: Response) => {
                console.error(e);
                handleError(e);
            });
        },
        delete: async (endPoint: string, params: any, callBack?: (response: TCallBack) => void) => {
            setData({ ...defaultResponse , loading: true });
            const body = JSON.stringify(params);
            const postOptions = { headers, ...options, method: 'DELETE', body }
            await fetch(`${url}${endPoint}`, postOptions).then(async (res) => {
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
                handleResult({ result, headers }, callBack);
            }, (res: Response) => {
                handleError(res, callBack);
            }).catch((e: Response) => {
                console.error(e);
            });
        }
    }

    return { ...data, fetchData };
}

export default useFetchData;