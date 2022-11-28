//** 1.0.0 | www.phoxer.com */
import { createContext, useState, useContext } from 'react';
import LoadingDialog, { ILoadingDialog } from './Loading';
import MessageDialog, { IMessageDialog } from './Message';

type TUseDialogs = {
    readonly showLoading: React.Dispatch<React.SetStateAction<ILoadingDialog>>;
    readonly showMessage: React.Dispatch<React.SetStateAction<IMessageDialog>>;
}
type TDialogs = {
    children: React.ReactNode;
}

const DialogsContext = createContext<TUseDialogs>({ showLoading: () => {}, showMessage: () => {} });

export const useDialogs = (): TUseDialogs => {
    return useContext(DialogsContext);
}

const Dialogs: React.FC<TDialogs> = ({children}) => {
    const [loadingDialog, showLoading] = useState<ILoadingDialog>({ show: false });
    const [messageDialog, showMessage] = useState<IMessageDialog>({ show: false, title: "", message: "" });

    return (<DialogsContext.Provider value={{ showLoading, showMessage }}>
        {children}
        <LoadingDialog {...loadingDialog} />
        <MessageDialog {...messageDialog} />
    </DialogsContext.Provider>);
}

export default Dialogs;
export { LoadingDialog, type ILoadingDialog };
export { MessageDialog, type IMessageDialog };