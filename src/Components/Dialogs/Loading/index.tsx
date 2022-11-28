/** 1.0.2 | www.phoxer.com */
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const SLoading = styled(Backdrop)`
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const SDialogText = styled(Typography)`
    margin-top: 1rem;
    text-align: center;
`
export interface ILoadingDialog {
  show: boolean;
  message?: string;
  color?: string;
}

const LoadingDialog: React.FC<ILoadingDialog> = ({ show, message, color = '#fff' }) => {
  return (<SLoading
    sx={{ color, zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={show}
  >
    <CircularProgress color="inherit" />
    {message && <SDialogText variant="subtitle1">{ message }</SDialogText>}
  </SLoading>)
}

export default LoadingDialog;