//** 1.0.2 | www.phoxer.com */
import { createContext, useState, useContext } from 'react';
import SnackMessage, { ISnackMessage, ISnackMessageExtend, TAutoHideDuration } from './SnackMessage';
import { SnackbarOrigin } from '@mui/material';
import { styled } from '@mui/material/styles';

type TMaxSnacks = 2|3|4|5|6;

type TSnackMessages = {
    children: React.ReactNode;
    maxSnacks?: TMaxSnacks;
    autoHideDuration?: TAutoHideDuration;
    position?: SnackbarOrigin;
}

type TUseSnackMessages = {
    readonly showSnackMessage: (snackData: ISnackMessage) => void;
    readonly totalSnacks: number;
    readonly queuedSnacks: number;
}

const SnackMessagesContext = createContext<TUseSnackMessages>({ showSnackMessage: () => {}, totalSnacks: 0, queuedSnacks: 0 });

export const useSnackMessages = (): TUseSnackMessages => {
    return useContext(SnackMessagesContext);
}

const SSnacksMessageContainer = styled('div')((props: SnackbarOrigin) => `
    position: fixed;
    box-sizing: border-box;
    display: flex;
    z-index: 1400;
    overflow: hidden;
    flex-direction: column-reverse;
    padding: .5rem;
    ${props.vertical}: 0;
    ${props.horizontal}: 0;
`);

const SnackMessages: React.FC<TSnackMessages> = ({ children, maxSnacks = 5, autoHideDuration = 5000, position = { vertical: 'bottom', horizontal: 'right' } }) => {
    const [snackMessages, setSnackMessage] = useState<ISnackMessageExtend[]>([]);
    const [snackCount, setSnackCount] = useState<number>(0);

    const showSnackMessage = (snackData: ISnackMessage) => {
        setSnackMessage((prevSnackMessages: ISnackMessageExtend[]) => {
            return [...prevSnackMessages, {...snackData, id: snackCount, show: true, autoHideDuration }];
        });
        setSnackCount((prevCount: number) => {
            return prevCount + 1;
        });
    }

    const onSnackMessageClose = (closedSnack: ISnackMessageExtend) => {
        setSnackMessage((prevSnackMessages: ISnackMessageExtend[]) => {
            const activeSnacks = prevSnackMessages.filter((snack: ISnackMessageExtend) => {
                return snack.show === true;
            });
            const newSnackMessages = activeSnacks.map((snack: ISnackMessageExtend) => {
                return snack.id === closedSnack.id ? {...snack, show: false} : snack;
            });
            return [...newSnackMessages];
        });
    }

    const totalSnacks: number = snackMessages.length;
    const queuedSnacks: number = (snackMessages.length > maxSnacks) ? snackMessages.length - maxSnacks : 0;

    return (<SnackMessagesContext.Provider value={{ showSnackMessage, totalSnacks, queuedSnacks }}>
        {children}
        <SSnacksMessageContainer {...position}>
            {snackMessages.slice(0, maxSnacks).map((snackData: ISnackMessageExtend, inx: number) => {
                return <SnackMessage key={`snk${snackData.id || inx}`} {...snackData} onClose={onSnackMessageClose} />;
            })}
        </SSnacksMessageContainer>
    </SnackMessagesContext.Provider>)
}

export default SnackMessages;