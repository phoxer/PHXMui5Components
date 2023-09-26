/** 1.0.0 | www.phoxer.com */
import { useState, useCallback, useEffect } from "react";
import { parseJSON } from "../../Utils";

type TLocalStorage =  readonly [any, React.Dispatch<any>];

const useLocalStorage = (key: string, initialValue: any): TLocalStorage => {

    const readValue = useCallback((): any => {
        if (typeof window === 'undefined') {
            console.warn("LocalStorage is Not Available!.");
            return initialValue
        }
    
        try {
          const item = window.localStorage.getItem(key)
          return item ? (parseJSON(item) as any) : initialValue
        } catch (error) {
          console.warn(`Error reading localStorage key “${key}”:`, error)
          return initialValue
        }
    }, [initialValue, key]);
    
    const [storedValue, setStoredValue] = useState<any>(readValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [storedValue, key]);
    
    return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;