/** 1.0.2 | www.phoxer.com */
import { useEffect, useRef, useState } from 'react';

type TUseTimeOut = {
    readonly timeIsOut: boolean;
    readonly startTimeOut: () => void;
}

const useTimeOut = (delay: number, startOnMount: boolean = true): TUseTimeOut => {
    const [timeIsOut, setTimeIsOut] = useState<boolean>(false);
    const id = useRef<NodeJS.Timeout>();

    const startTimeOut = () => {
        setTimeIsOut(false);
        clearTimeout(id.current);
        id.current = setTimeout(() => setTimeIsOut(true), delay);
    }
    
    useEffect(() => {
        if (startOnMount) {
            startTimeOut();
        }
        return () => clearTimeout(id.current);
    }, [delay]);

    return { timeIsOut, startTimeOut };
}

export default useTimeOut;