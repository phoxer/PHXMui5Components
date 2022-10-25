import { styled } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';

interface IMenuIcon {
    icon: JSX.Element;
}

const SListItemIcon = styled(ListItemIcon)`
    min-width: 27px;
    .MuiSvgIcon-root {
        font-size: 1.2rem;
    }
`

const MenuIcon: React.FC<IMenuIcon> = ({ icon }) => {
    return (<SListItemIcon>
        {icon}
    </SListItemIcon>)
}

export default MenuIcon;