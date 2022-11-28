/** 1.0.1 | www.phoxer.com */
import { useState } from 'react';
import { Tabs as TabsBar } from '@mui/material';
import TabItem, { IValue } from './TabItem';

export type ITabsData = {
    label: string;
    value: any;
    icon?: JSX.Element;
    tabProps?: any;
}

type ITabs = {
    id: string;
    tabsData: ITabsData[];
    onChange: (value: any) => void;
    defaultSelected?: number;
    tabsProps?: any;
}

const Tabs: React.FC<ITabs> = ({ id, tabsData, onChange, tabsProps, defaultSelected = 0 }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(defaultSelected);
    
    const onTabClick = ({ tabIndex, value }: IValue) => {
        onChange(value);
        setSelectedIndex(tabIndex);
    }

    return (<TabsBar value={false} {...tabsProps}>
        {tabsData.map((item: ITabsData, inx: number) => {
            return <TabItem key={`${id}-tb${inx}`} tabIndex={inx} selectedIndex={selectedIndex} {...item} onTabClick={onTabClick} />;
        })}
    </TabsBar>);
}

export default Tabs;