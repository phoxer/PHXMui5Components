/** 1.0.2 | www.phoxer.com */
import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertColor, SnackbarOrigin } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface ISnackMessage {
    message: string;
    severity?: AlertColor | undefined;
}

interface SnackbarPosition extends SnackbarOrigin {
    px?: number
}

export type TAutoHideDuration = 3000|4000|5000|6000|7000|8000|9000|10000;

export interface ISnackMessageExtend extends ISnackMessage {
    show: boolean;
    id?: number;
    position?: SnackbarPosition | undefined;
    autoHideDuration?: TAutoHideDuration;
    onClose?: (snackMessage: ISnackMessageExtend) => void;
}

const SSnacksBar = styled(Snackbar)`
    position: relative;
    top: unset!important;
    left: unset!important;
    bottom: unset!important;
    right: unset!important;
    margin-bottom: .2rem;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`

const SnackMessage: React.FC<ISnackMessageExtend> = (props: ISnackMessageExtend) => {
    const { show, message, severity = 'success', position, autoHideDuration, onClose } = props;
    const [showSnack, setShowSnack] = useState<boolean>(show);

    useEffect(() => {
        if (show) {
            const id = setInterval(() => {
                closeSnack();
            }, autoHideDuration);
            return () => clearInterval(id);
        }
    }, [show]);

    const closeSnack = () => {
        setShowSnack(false);
        if (onClose) {
            onClose(props);
        }
    }

    return (<SSnacksBar open={showSnack} anchorOrigin={position}>
        <Alert severity={severity} sx={{ width: '100%' }} onClose={closeSnack}>
          {message}
        </Alert>
    </SSnacksBar>)
}

export default SnackMessage;