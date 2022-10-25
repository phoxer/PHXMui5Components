import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface IHeader {
    title: string;
    icon?: JSX.Element;
    buttonGroup?: JSX.Element;
    barProps?: any;
    toolBarProps?: any;
    titleProps?: any;
}

const SAppBar = styled(AppBar)`
    box-shadow: unset;
    background-color: unset;
    color: #000;
    border-bottom: .1rem rgba(0, 0, 0, 0.12) solid;
`
const SToolbar = styled(Toolbar)`
    padding: 0px 8px !important;
`
const STypography = styled(Typography)`
    font-size: 1.2rem;
    font-weight: bold;
    margin-left: 0.5rem;
    flex-grow: 1;
    line-height: 0rem;
`

const Header: React.FC<IHeader> = ({ title, icon, buttonGroup, barProps, toolBarProps, titleProps }) => {
    return (<SAppBar { ...{ position:"static", ...barProps } }>
        <SToolbar { ...{ variant:"dense", ...toolBarProps } }>
            {icon && icon}
            <STypography {...titleProps}>
                {title}
            </STypography>
            {buttonGroup && buttonGroup}
        </SToolbar>
    </SAppBar>)
}

export default Header;