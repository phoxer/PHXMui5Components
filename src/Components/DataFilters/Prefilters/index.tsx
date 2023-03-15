import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export interface IPreFilter {
    label: string;
    values: any;
}

interface IPReFilterProps extends IPreFilter {
    id: number;
    onTabSelected: (id: number, values: any) => void;
}

export interface IPreFilters {
    options: IPreFilter[];
    defaultSelected: number;
    componentProps?: any;
}

interface IPreFiltersProps extends IPreFilters {
    onPreFilter: (values: any) => void;
}

const PreFilter: React.FC<IPReFilterProps> = ({ id, label, values, onTabSelected }): JSX.Element => {
    return <Tab label={label} onClick={() => onTabSelected(id, values)} />
}

const PreFilters: React.FC<IPreFiltersProps> = ({ options, defaultSelected, onPreFilter, componentProps }): JSX.Element => {
    const [value, setValue] = useState<number>(defaultSelected || 0);

    const onTabSelected = (id: number, values: any) => {
        onPreFilter(values);
        setValue(id);
    }

    return (<Tabs value={value} {...componentProps} sx={{ marginBottom: '1rem' }}>
        {options.map((pflt: IPreFilter, ix: number) => {
            return <PreFilter key={`pft${ix}`} id={ix} {...pflt} onTabSelected={onTabSelected} />
        })}
    </Tabs>);
};

export default PreFilters;