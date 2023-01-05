/** 1.0.2 | www.phoxer.com */
import { useEffect, useState, useRef } from 'react';

type TUseInterval = {
    readonly interval: number;
    readonly startInterval: () => void;
    readonly stopInterval: (reset?: boolean) => void;
}

const useInterval = (delay: number, step: number = 1, startOnMount: boolean = true): TUseInterval => {
    const [interval, setTimer] = useState<number>(0);
    const id = useRef<NodeJS.Timer | null>(null);

    const startInterval = () => {
        if (delay < 10) {
            console.error("delay value should be higher than 10 milliseconds");
            return;
        }
        if (step < 1) {
            console.error("step value should be higher than 1");
            return;
        }
        id.current = setInterval(() => {
            setTimer((oldTime: number) => {
                return oldTime + step;
            })
        }, delay);
    }
    
    useEffect(() => {
        if (startOnMount) {
            startInterval();
        }
        return () => clearInterval(id.current || 0);
    }, [delay, step, id]);

    const stopInterval = (reset: boolean = false) => {
        clearInterval(id.current || 0);
        if (reset) {
            setTimer(0);
        }
    }

    return { interval, startInterval, stopInterval };
}

export default useInterval;