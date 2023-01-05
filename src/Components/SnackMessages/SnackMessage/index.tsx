/** 1.0.3 | www.phoxer.com */
import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { AlertColor, SnackbarOrigin } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface ISnackMessage {
    message: string;
    severity?: AlertColor | undefined;
    onUndoAction?: () => void;
}

export type TAutoHideDuration = 3000|4000|5000|6000|7000|8000|9000|10000;

export interface ISnackMessageExtend extends ISnackMessage {
    id?: number;
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
    const { message, severity = 'error', autoHideDuration, onClose, onUndoAction } = props;

    useEffect(() => {
        const id = setInterval(() => {
            closeSnack();
        }, autoHideDuration);
        return () => clearInterval(id);
    }, []);

    const closeSnack = () => {
        if (onClose) {
            onClose(props);
        }
    }

    let actions;
    if (onUndoAction) {
        actions = { action: <Button color="error" size="small" onClick={() => {
            onUndoAction();
            closeSnack();
        }}>UNDO</Button>}
    } else {
        actions = { onClose: closeSnack }
    }

    return (<SSnacksBar open={true}>
        <Alert severity={severity} sx={{ width: '100%' }} {...actions}>
          {message}
        </Alert>
    </SSnacksBar>)
}

export default SnackMessage;