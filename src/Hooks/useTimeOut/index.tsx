/** 1.0.0 | www.phoxer.com */
import { useEffect, useState } from 'react';

type TUseTimeOut = {
    readonly timeIsOut: boolean;
}

const useTimeOut = (delay: number): TUseTimeOut => {
    const [timeIsOut, setTimeIsOut] = useState<boolean>(false);
    
    useEffect(() => {
        const id = setTimeout(() => setTimeIsOut(true), delay);
        return () => clearTimeout(id);
    }, [delay]);

    return { timeIsOut };
}

export default useTimeOut;