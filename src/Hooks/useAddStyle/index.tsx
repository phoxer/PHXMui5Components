/** 1.0.0 | www.phoxer.com */
import { useEffect, useState } from 'react';

type TUseAddStyle = {
    readonly ready: boolean;
    readonly status: string;
}

const useAddStyle = (href: string, attributes?: any, persist: boolean = true): TUseAddStyle => {
    const [ready, setReady] = useState<boolean>(false);
    const [status, setStatus] = useState<string>("loading");
    
    useEffect(() => {
        const style = document.createElement("link");
        style.rel  = 'stylesheet';
        style.type = 'text/css';
        style.href = href;
        if (typeof attributes === 'object') {
            for (const [key, value] of Object.entries(attributes)) {
                if (typeof value === 'string') {
                    style.setAttribute(key, value);
                }
            }
        }
        document.head.appendChild(style);

        const setAttributeFromEvent = (event: any) => {
            setStatus(event.type === "load" ? "ready" : "error");
            if (event.type === "load") {
                setReady(true);
            }
        };

        style.addEventListener("load", setAttributeFromEvent);
        style.addEventListener("error", setAttributeFromEvent);
        return () => {
            if (style) {
                style.removeEventListener("load", setAttributeFromEvent);
                style.removeEventListener("error", setAttributeFromEvent);
            }
            if (!persist) {
                style.remove();
            }
        };
    }, [href]);

    return { ready, status };
}

export default useAddStyle;