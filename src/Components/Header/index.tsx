/** 1.0.2 | www.phoxer.com */
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type THeader = {
    title: string;
    icon?: JSX.Element;
    children?: React.ReactNode;
    appBarProps?: any;
    toolBarProps?: any;
    typographyProps?: any;
}

const SAppBar = styled(AppBar)`
    box-shadow: unset;
    background-color: unset;
    color: #000;
    border-bottom: .1rem rgba(0, 0, 0, 0.12) solid;
    padding-bottom: 1rem;
    width: 100%
`
const SToolbar = styled(Toolbar)`
    padding: 0px 8px !important;
    width: 100%
`
const STypography = styled(Typography)`
    font-size: 1.2rem;
    font-weight: bold;
    margin-left: 0.5rem;
    flex-grow: 1;
    line-height: 0rem;
`

const Header: React.FC<THeader> = ({ title, icon, children, appBarProps, toolBarProps, typographyProps }) => {
    return (<SAppBar { ...{ position:"static", ...appBarProps } }>
        <SToolbar { ...{ variant:"dense", ...toolBarProps } }>
            {icon && icon}
            <STypography {...typographyProps}>
                {title}
            </STypography>
            {children && <Stack spacing={1} direction="row">{children}</Stack>}
        </SToolbar>
    </SAppBar>)
}

export default Header;
export type { THeader };