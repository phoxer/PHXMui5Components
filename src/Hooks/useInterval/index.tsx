/** 1.0.3 | www.phoxer.com */
import { isNil } from 'ramda';
import { useEffect, useState, useRef } from 'react';

type TUseInterval = {
    readonly interval: number;
    readonly startInterval: () => void;
    readonly stopInterval: (resetValue?: boolean, startTimer?: boolean) => void;
}

const useInterval = (delay: number, step: number = 1, startOnMount: boolean = false): TUseInterval => {
    const [interval, setTimer] = useState<number>(0);
    const id = useRef<number | undefined>(undefined);

    const startInterval = () => {
        if (delay < 10) {
            console.error("delay value should be higher than 10 milliseconds.");
            return;
        }
        if (step < 1) {
            console.error("step value should be higher than 1.");
            return;
        }
        if (isNil(id.current)) {
            id.current = window.setInterval(() => {
                setTimer((oldTime: number) => {
                    return oldTime + step;
                })
            }, delay);
        }
    }
    
    useEffect(() => {
        if (startOnMount) {
            startInterval()
        }
        return () => {
            console.log('STOP')
            stopInterval();
        }
    }, [startOnMount]);

    const stopInterval = (resetValue: boolean = false, startTimer: boolean = false) => {
        clearInterval(id.current);
        id.current = undefined;
        if (resetValue) {
            setTimer(0);
        }
        if (startTimer) {
            startInterval();
        }
    }

    return { interval, startInterval, stopInterval };
}

export default useInterval;