/** 1.0.0 | www.phoxer.com */
type TUseStorage = {
    readonly localStorage: Storage | null;
    readonly sessionStorage: Storage | null;
}

const useStorage = (): TUseStorage => {
    const localStorage = window && window.localStorage || null;
    const sessionStorage = window && window.sessionStorage || null;
    return { localStorage, sessionStorage };
}

export default useStorage;