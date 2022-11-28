import Tab from '@mui/material/Tab';

export type IValue = {
    tabIndex: number;
    value: any;
}

type ITabItem = {
    tabIndex: number;
    selectedIndex: number;
    label: string;
    value: any;
    onTabClick: (value: IValue) => void;
    icon?: JSX.Element;
    tabProps?: any;
}

const TabItem: React.FC<ITabItem> = (props) =>{
    const { tabIndex, selectedIndex, label, icon, onTabClick, value, tabProps } = props;
    return <Tab onClick={() => onTabClick({ tabIndex, value })} value={tabIndex} label={label} icon={icon} {...tabProps} selected={selectedIndex === tabIndex} />;
}

export default TabItem;