import { useEffect, useState } from 'react';

type TUseTimeOut<T> = {
    readonly timeIsOut: boolean;
}

const useTimeOut = (delay: number): TUseTimeOut<boolean> => {
    const [timeIsOut, setTimeIsOut] = useState<boolean>(false);
    
    useEffect(() => {
        const id = setTimeout(() => setTimeIsOut(true), delay);
        return () => clearTimeout(id);
    }, [delay]);

    return { timeIsOut };
}

export default useTimeOut;