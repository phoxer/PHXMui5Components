/** 1.0.0 | www.phoxer.com */
import { useState, useCallback, useEffect } from "react";
import { parseJSON } from "../../Utils";

type TSessionStorage =  readonly [any, React.Dispatch<any>];

const useSessionStorage = (key: string, initialValue: any): TSessionStorage => {

    const readValue = useCallback((): any => {
        if (typeof window === 'undefined') {
            console.warn("SessionStorage is Not Available!.");
            return initialValue
        }
    
        try {
          const item = window.sessionStorage.getItem(key)
          return item ? (parseJSON(item) as any) : initialValue
        } catch (error) {
          console.warn(`Error reading SessionStorage key “${key}”:`, error)
          return initialValue
        }
    }, [initialValue, key]);
    
    const [storedValue, setStoredValue] = useState<any>(readValue);

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(storedValue));
    }, [storedValue, key]);
    
    return [storedValue, setStoredValue] as const;
}

export default useSessionStorage;