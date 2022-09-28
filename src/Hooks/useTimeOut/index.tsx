import { useEffect, useState } from 'react';

const useTimeOut = (delay: number) => {
    const [timeIsOut, setTimeIsOut] = useState(false);
    
    useEffect(() => {
        const id = setTimeout(() => setTimeIsOut(true), delay);
        return () => clearTimeout(id);
    }, [delay]);

    return { timeIsOut };
}

export default useTimeOut;