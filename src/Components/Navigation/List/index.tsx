/** 2.0.2 | www.phoxer.com */
import { useState, useMemo } from 'react';
import MenuList from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import { isNil, isEmpty } from 'ramda';

export interface IListItem {
    label?: string;
    value?: any;
    icon?: JSX.Element;
    listItems?: IListItem[];
    expanded?: boolean;
    active?: boolean;
}

interface IList extends IListItem {
    onItemSelected: (value: any) => void;
}

type TExpandList = {
    open: boolean;
}

const ExpandList: React.FC<TExpandList> = ({ open }) => {
    return open ? <ExpandMore /> : <ChevronRight />
}

const List: React.FC<IList> = ({ label, value = null, icon, listItems, onItemSelected, expanded = true }) => {
    const [open, setOpen] = useState<boolean>(expanded);
    const isHeader = isNil(value) && !isEmpty(listItems);
    const showLabel = !isNil(label) || !isNil(icon);

    const menuItemAction = (): Object => {
        if (!isNil(value)) {
            return { onClick: () => onItemSelected(value) };
        } else if (isHeader) {
            return showLabel? { onClick: () => setOpen((op: boolean) => !op) } : {};
        }
        return {};
    }

    return (<MenuList component="nav" dense disablePadding>
        {showLabel && (<ListItemButton {...menuItemAction()}>
            {icon && <ListItemIcon sx={{ minWidth: 30 }}>{icon}</ListItemIcon>}
            {label && <ListItemText primary={label} primaryTypographyProps={{ variant: isHeader ? 'h6' : 'subtitle1' }} />}
            {isHeader && <ExpandList open={open} />}
        </ListItemButton>)}
        {isHeader && <Divider />}
        {isHeader && (<Collapse in={open} timeout="auto">
            <MenuList component="div" disablePadding sx={{ paddingLeft: showLabel ? 2 : 0 }}>
                {listItems && listItems.map((item: IListItem, index: number) => {
                    return <List key={`itm${index}`} {...item} onItemSelected={onItemSelected} />
                })}
            </MenuList>
            <Divider />
        </Collapse>)}
    </MenuList>);
}

export default List;