import { useState } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem, { IValue } from './MenuItem';
import AccordionList from './AccordionList';

export interface IListData {
    label?: string;
    title?: string;
    value?: any;
    icon?: JSX.Element;
    listData?: IListData[];
    expandable?: boolean;
    expanded?: boolean;
}

interface IList {
    id: string;
    listData: IListData[];
    onChange: (value: any) => void;
    defaultSelected?: number;
    menuProps?: any;
}

const List: React.FC<IList> = ({ id, listData, onChange, defaultSelected = -1, menuProps }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(defaultSelected);
    let index = 0;

    const setNewIndex = () => {
        index ++;
        return index-1;
    }

    const onMenuItemClick = ({ index, value}: IValue) => {
        onChange(value);
        setSelectedIndex(index);
    }

    return (<MenuList {...menuProps}>
        {listData.map((data: IListData) => {
            const { label = "", title= "", value, icon, listData: accordeonData, expandable = false, expanded = false } = data;
            
            if (expandable && accordeonData) {
                return (<AccordionList key={`${id}-Acc${index}`} id={id} title={title} icon={icon} expanded={expanded} >
                    {accordeonData.map((acData: IListData) => {
                        const mnInx = setNewIndex();
                        const mnID = `${id}-Itm${mnInx}`;
                        return <MenuItem key={mnID} index={mnInx} label={acData.label ?? ""} value={acData.value} onMenuItemClick={onMenuItemClick} icon={acData.icon} selected={mnInx === selectedIndex} />
                    })}
                </AccordionList>)
            }
            const mnInx = setNewIndex();
            const mnID = `${id}-Itm${mnInx}`;
            return <MenuItem key={mnID} index={mnInx} label={label} value={value} onMenuItemClick={onMenuItemClick} icon={icon} selected={mnInx === selectedIndex} />
        })}
    </MenuList>);
}

export default List;