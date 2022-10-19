import React from 'react';
import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';

const SDialogContent = styled(DialogContent)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const SDialogText = styled(Typography)`
    margin-top: 1rem;
    text-align: center;
`
interface ILoadingDialog {
  show: boolean;
  message?: string;
}

const LoadingDialog: React.FC<ILoadingDialog> = ({ show, message }) => {
    return (<Dialog open={show}>
      <SDialogContent>
        <CircularProgress className="progress" />
        {message && <SDialogText variant="subtitle1">{ message }</SDialogText>}
      </SDialogContent>
    </Dialog>);
}

export default LoadingDialog;