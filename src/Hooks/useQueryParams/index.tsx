/** 1.0.0 | www.phoxer.com */
import { useState, useEffect } from 'react';
import { isNil, isEmpty } from 'ramda';

type TUseQueryParams =  readonly [any, React.Dispatch<any>];

export type TQueryParams = {
    [key: string]: any;
}

const useQueryParams = (defaultValue?: TQueryParams, keysToIgnore?: string[], useHash: boolean = false): TUseQueryParams => {
    const [queryParams, setQueryParams] = useState<TQueryParams | null>(null);

    useEffect(() => {
        let params = new URLSearchParams();
        if (!isEmpty(window.location.hash)) {
            params = new URLSearchParams(window.location.hash.replace(/#/i, ''));
        } else if (!isEmpty(window.location.search)) {
            params = new URLSearchParams(window.location.search);
        }
        setQueryParams(!isNil(defaultValue) ? { ...defaultValue, ...Object.fromEntries(params)} : Object.fromEntries(params));
    }, []);

    useEffect(() => {
        if (!isNil(queryParams) && !isEmpty(queryParams)) {
            const newQueryParams = { ... queryParams };
            if (!isNil(keysToIgnore) && !isEmpty(keysToIgnore)) {
                keysToIgnore.forEach((key: string) => {
                    console.log(key);
                    delete newQueryParams[key];
                });
            }
            const params = new URLSearchParams(newQueryParams).toString();
            if (useHash) {
                window.location.hash = `?${params}`;
            } else {
                window.location.search = params;
            }
        }
    }, [queryParams]);

    return [queryParams, setQueryParams] as const;
}

export default useQueryParams;