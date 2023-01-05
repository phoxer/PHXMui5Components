/** 1.0.1 | www.phoxer.com */
import { useEffect, useState } from 'react';

type TUseWindowSize = {
    readonly screenWidth: number | undefined;
    readonly screenHeight: number | undefined;
    readonly innerWidth: number | undefined;
    readonly innerHeight: number | undefined;
    readonly outerWidth: number | undefined;
    readonly outerHeight: number | undefined;
    readonly landscape: boolean;
}

type TWindowSize = {
    screenWidth: number | undefined;
    screenHeight: number | undefined;
    innerWidth: number | undefined;
    innerHeight: number | undefined;
    outerWidth: number | undefined;
    outerHeight: number | undefined;
    landscape: boolean;
}

const useWindowSize = (): TUseWindowSize => {
    const [windowSize, setWindowSize] = useState<TWindowSize>({
        screenWidth: undefined,
        screenHeight: undefined,
        innerWidth: undefined,
        innerHeight: undefined,
        outerWidth: undefined,
        outerHeight: undefined,
        landscape: false
    });

    const handleResize = () => {
        setWindowSize({
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            outerWidth: window.outerWidth,
            outerHeight: window.outerHeight,
            landscape: (window.innerWidth > window.innerHeight)
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