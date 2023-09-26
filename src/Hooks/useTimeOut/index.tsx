/** 1.0.3 | www.phoxer.com */
import { isNil } from 'ramda';
import { useEffect, useRef, useState } from 'react';

type TUseTimeOut = {
    readonly timeIsOut: boolean;
    readonly countDown: number;
    readonly startTimeOut: () => void;
    readonly stopTimeOut: () => void;
}

const useTimeOut = (delay: number, startOnMount: boolean = true): TUseTimeOut => {
    const [timeIsOut, setTimeIsOut] = useState<boolean>(false);
    const initCoundDown = Math.floor((delay/1000) % 60);
    const [countDown, setCoundDown] = useState<number>(initCoundDown);
    const idTimeOut = useRef<number | undefined>(undefined);
    const idCountDown = useRef<number | undefined>(undefined);

    const stopTimeOut = () => {
        clearTimeout(idTimeOut.current);
        idTimeOut.current = undefined;
        clearTimeout(idCountDown.current);
        idCountDown.current= undefined;
        setCoundDown(initCoundDown);
    }

    const startTimeOut = () => {
        if (delay < 1000) {
            console.error("delay value should be higher than 1000 millisecond.");
            return;
        }
        if (isNil(idTimeOut.current) && isNil(idCountDown.current)) {
            setTimeIsOut(false);
            idTimeOut.current = window.setTimeout(() => {
                setTimeIsOut(true);
                stopTimeOut();
            }, delay);
            idCountDown.current = window.setInterval(() => {
                setCoundDown((oldTime: number) => {
                    if (oldTime < 0) {
                        stopTimeOut();
                    }
                    return oldTime - 1;
                });
            }, 1000);
        }
    }
    
    useEffect(() => {
        if (startOnMount) {
            startTimeOut();
        }
        return () => {
            stopTimeOut();
        }
    }, []);

    return { timeIsOut, countDown, startTimeOut, stopTimeOut };
}

export default useTimeOut;