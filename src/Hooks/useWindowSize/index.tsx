/** 1.0.0 | www.phoxer.com */
import { useEffect, useState } from 'react';

type TUseWindowSize = {
    readonly width: number | undefined;
    readonly height: number | undefined;
}

type TWindowSize = {
    width: number | undefined;
    height: number | undefined;
}

const useWindowSize = (): TUseWindowSize => {
    const [windowSize, setWindowSize] = useState<TWindowSize>({
        width: undefined,
        height: undefined,
    });

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }
    
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return { ...windowSize };
}

export default useWindowSize;