/** 1.0.0 | www.phoxer.com */
import { useEffect, useState } from 'react';

type TUseAddScript = {
    readonly ready: boolean;
    readonly status: string;
}

const useAddScript = (src: string, attributes?: any, persist: boolean = true): TUseAddScript => {
    const [ready, setReady] = useState<boolean>(false);
    const [status, setStatus] = useState<string>("loading");
    
    useEffect(() => {
        const script = document.createElement("script");
        script.src = src;
        script.setAttribute("data-status", "loading");
        if (typeof attributes === 'object') {
            for (const [key, value] of Object.entries(attributes)) {
                if (typeof value === 'string') {
                    script.setAttribute(key, value);
                }
            }
        }
        document.body.appendChild(script);

        const setAttributeFromEvent = (event: any) => {
            script.setAttribute(
                "data-status",
                event.type === "load" ? "ready" : "error"
            );
            setStatus(event.type === "load" ? "ready" : "error");
            if (event.type === "load") {
                setReady(true);
            }
        };

        script.addEventListener("load", setAttributeFromEvent);
        script.addEventListener("error", setAttributeFromEvent);
        return () => {
            if (script) {
                script.removeEventListener("load", setAttributeFromEvent);
                script.removeEventListener("error", setAttributeFromEvent);
            }
            if (!persist) {
                script.remove();
            }
        };
    }, [src]);

    return { ready, status };
}

export default useAddScript;