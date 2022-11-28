import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '../MenuIcon';

export type IValue = {
  index: number;
  value: any;
}

type IMenuItem = {
    label: string;
    value: any;
    onMenuItemClick: (value: IValue) => void;
    index: number
    icon?: JSX.Element;
    key?: string;
    selected?: boolean;
}

const SListItemButton = styled(ListItemButton)`
  padding: 2px 5px 2px 15px;
`
const SListItemText = styled(ListItemText)`
  .MuiTypography-root {
    font-size: .8rem;
    line-height: 1rem;
  }
`

const MenuItem: React.FC<IMenuItem> = ({ label, value, index, icon, onMenuItemClick, selected = false }) =>{
    return (<ListItem onClick={() => onMenuItemClick({ index, value })} selected={selected} disablePadding>
        <SListItemButton>
          {icon && <MenuIcon icon={icon} />}
          <SListItemText primary={label} />
        </SListItemButton>
      </ListItem>)
}

export default MenuItem;