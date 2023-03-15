/** 1.0.4 | www.phoxer.com */
import { useState } from 'react';

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
const headers = {'Content-Type': 'application/json; charset=UTF-8'};

const useFetchData = (url: string, options: any): TUseFetchData  => {
    const [data, setData] = useState<TData>({ result: null, error: null, loading: false });

    const handleError = (e: Response) => {
        const statusText = e.statusText? e.statusText : "Fetch Error";
        const error = e.status? { status: e.status, message: statusText } : { status: 500, message: `${e}` }
        setData({ result: null, error, loading: false });
    }

    const handleResult = (json: any, callBack?: (jsonData: any) => void, returnData: boolean = false) => {
        if (callBack) {
            callBack(json);
            setData({ result: returnData? data.result : null, error: null, loading: false });
        } else {
            setData({ result: json, error: null, loading: false });
        }
    }

    const fetchData = {
        get: async (endPoint: string, params: any = null, callBack?: (data: any) => void, returnData: boolean = false) => {
            const urlParams = params ? `${url}${endPoint}?${new URLSearchParams(params).toString()}` : `${url}${endPoint}`;
            setData({ result: null, error: null, loading: true });
            await fetch(urlParams, { headers, ...options, method: 'GET' }).then((res) => {
                if (res.ok && okStatus.includes(res.status)) {
                    return res.json();
                } 
                handleError(res);
                return Promise.reject(res);
            }).then((json) => {
                handleResult(json, callBack, returnData);
            }).catch((e: Response) => {
                console.error(e);
                handleError(e);
            });
        },
        post: async (endPoint: string, params: any, callBack?: (data: any) => void, returnData: boolean = false) => {
            setData({ result: null, error: null, loading: true });
            const postOptions = { headers, ...options, method: 'POST', body: JSON.stringify(params) }
            await fetch(`${url}${endPoint}`, postOptions).then((res) => {
                if (res.ok && okStatus.includes(res.status)) {
                    return res.json();
                }
                handleError(res);
                return Promise.reject(res);
            }).then((json) => {
                handleResult(json, callBack, returnData);
            }).catch((e: Response) => {
                console.error(e);
                handleError(e);
            });
        },
        put: async (endPoint: string, params: any, callBack?: (data: any) => void, returnData: boolean = false) => {
            setData({ result: null, error: null, loading: true });
            const postOptions = { headers, ...options, method: 'PUT', body: JSON.stringify(params) }
            await fetch(`${url}${endPoint}`, postOptions).then((res) => {
                if (res.ok && okStatus.includes(res.status)) {
                    return res.json();
                } 
                handleError(res);
                return Promise.reject(res);
            }).then((json) => {
                handleResult(json, callBack, returnData);
            }).catch((e: Response) => {
                console.error(e);
                handleError(e);
            });
        },
        delete: async (endPoint: string, params: any, callBack?: (data: any) => void, returnData: boolean = false) => {
            setData({ result: null, error: null, loading: true });
            const postOptions = { headers, ...options, method: 'DELETE', body: JSON.stringify(params) }
            await fetch(`${url}${endPoint}`, postOptions).then((res) => {
                if (res.ok && okStatus.includes(res.status)) {
                    return res.json();
                }
                handleError(res);
                return Promise.reject(res);
            }).then((json) => {
                handleResult(json, callBack, returnData);
            }).catch((e: Response) => {
                console.error(e);
            });
        }
    }

    return { ...data, fetchData };
}

export default useFetchData;