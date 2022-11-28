/** 1.0.0 | www.phoxer.com */
import { useState } from 'react';

type TUseCounter = {
    readonly count: number;
    readonly incrementCount: () => void;
    readonly decrementCount: () => void;
    readonly resetCount: () => void;
}

const useCounter = (initCount: number = 0, step: number = 1, allowNegative: boolean = true): TUseCounter => {
    const [count, setCount] = useState<number>(initCount);
    
    const incrementCount = () => {
        setCount((oldCount: number) => {
            return oldCount + step;
        });
    }

    const decrementCount = () => {
        setCount((oldCount: number) => {
            const newCount = oldCount - step;
            return allowNegative? newCount : (newCount<0)? 0 : newCount;
        });
    }

    const resetCount = () => {
        setCount(initCount);
    }

    return { count, incrementCount, decrementCount, resetCount };
}

export default useCounter;