/** 1.0.2 | www.phoxer.com */
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Alert, { AlertColor } from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const SDialog = styled(Dialog)`
    margin: 1rem;
`
const SDialogTop = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.02rem solid #ccc;
    padding: .5rem;
`
const SDialogTitle = styled(DialogTitle)`
    text-align: left;
    padding: 0rem;
`
const SDialogText = styled(DialogContentText)`
    text-align: left;
    padding: 1rem;
`
const SDialogContent = styled(DialogContent)`
    padding: 0rem;
`
const SIconButton = styled(IconButton)`
    padding: 0rem;
    margin-left: .5rem;
`

export interface IMessageDialog {
  show: boolean;
  title?: string;
  message: string;
  severity?: AlertColor | undefined;
  onClose?: () => void;
  onAgreeOrDisagree?: (action: boolean) => void;
  onTryAgain?: () => void;
  children?: React.ReactNode;
  supportHTML?: boolean;
  maxOnTryAgain?: number;
}

type TAgreeDisgreeActions = {
    onAgreeOrDisagree: (action: boolean) => void;
}

type TTryAgainActions = {
    onTryAgain: () => void;
    maxOnTryAgain: number;
}

type IMessageTitle = {
    title: string;
    onClose?: () => void;
}

const AgreeDisgreeActions: React.FC<TAgreeDisgreeActions> = ({ onAgreeOrDisagree }) => {
    return (<DialogActions>
        <Button onClick={() => onAgreeOrDisagree(false)} autoFocus>Disagree</Button>
        <Button onClick={() => onAgreeOrDisagree(true)} >Agree</Button>
    </DialogActions>);
}

const TryAgainActions: React.FC<TTryAgainActions> = ({ onTryAgain, maxOnTryAgain = 3 }) => {
    const [count, setCount] = useState<number>(0);

    const showAction = count < maxOnTryAgain;
    const handleTryAction = () => {
        if (showAction) {
            setCount((oldCount: number) => {
                return oldCount + 1;
            });
            onTryAgain();
        }
    }

    return (<DialogActions sx={{ justifyContent: 'center' }}>
        {showAction && <Button onClick={handleTryAction} autoFocus>{`Try Again (${maxOnTryAgain - count})`}</Button>}
        {!showAction && <SDialogText>Maximum limit exceeded.</SDialogText>}
    </DialogActions>);
}

const MessageTitle: React.FC<IMessageTitle> = ({ title, onClose }) => {
    return (<SDialogTop>
        <SDialogTitle variant="subtitle1">{title}</SDialogTitle>
        {onClose && <SIconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
        </SIconButton>}
    </SDialogTop>);
}

const MessageDialog: React.FC<IMessageDialog> = ({ show, title = "", message, severity = "info", onClose, onAgreeOrDisagree, onTryAgain, children = null, supportHTML = false, maxOnTryAgain = 3 }) => {
    return (<SDialog open={show}>
      <SDialogContent>
        {onClose && <MessageTitle title={title} onClose={onClose} />}
        <Alert severity={severity}>{ supportHTML ? <div dangerouslySetInnerHTML={{ __html: message }} /> : message }</Alert>
      </SDialogContent>
      {onAgreeOrDisagree && <AgreeDisgreeActions onAgreeOrDisagree={onAgreeOrDisagree} />}
      {onTryAgain && <TryAgainActions onTryAgain={onTryAgain} maxOnTryAgain={maxOnTryAgain} />}
      {children && <DialogActions>{children}</DialogActions>}
    </SDialog>);
}

export default MessageDialog;