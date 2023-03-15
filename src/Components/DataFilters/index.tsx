//** 1.0.0 | www.phoxer.com */
import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { Grid, Grid2TypeMap } from "@mui/material";
import Divider from '@mui/material/Divider';
import PreFilters, { IPreFilters } from "./Prefilters";
import DataSort, { IDataSort, IDataSortValues } from "./DataSort";
import SearchInput from './SearchInput';
import DropDown from "./DropDown";
import CheckBoxList from './CheckBoxList';

type Breakpoints = {
    [key: string]: string | number;
}

export interface IFilter {
    id: string;
    label: string;
    type: "Search" | "DropDown" | "CheckBoxList" | "Autocomplete" ;
    defaultValue: any;
    options?: any[];
    breakpoints: Breakpoints;
    componentProps?: any;
}

interface IFilterState extends IFilter{
    value: any;
    onDataChange: (value: any) => void;
}

export type TFilters = {
    filters: IFilter[];
    preFilters?: IPreFilters;
    dataSort?: IDataSort;
    onFilter: (data: any) => void;
    loading?: boolean;
    gridContainerProps?: Grid2TypeMap;
    filterOnMount?: boolean;
    filterOnClear?: boolean;
    filterOnSort?: boolean;
    filterOnPreFilter?: boolean;
}

const FilterWrapper: React.FC<IFilterState> = ({ id, label, type, options, value, onDataChange, breakpoints = { xs: 12 }, componentProps }): JSX.Element => {
    return (<Grid item {...breakpoints}>
        {type === "Search" && <SearchInput id={id} label={label} value={value} onChange={onDataChange} componentProps={componentProps} />}
        {type === "DropDown" && <DropDown id={id} label={label} value={value} options={options || []} onChange={onDataChange} componentProps={componentProps} />}
        {(type === "CheckBoxList" && options) && <CheckBoxList id={id} label={label} options={options || []} value={value} onChange={onDataChange} componentProps={componentProps} />}
    </Grid>);
};

const DataFilters: React.FC<TFilters> = ({ filters, onFilter, loading = false, dataSort, preFilters, filterOnMount = false, filterOnClear = false, filterOnSort = true, filterOnPreFilter = false, gridContainerProps = { spacing: 2 } }): JSX.Element => {
    const [data, setData] = useState<any>(null);

    const setDefaultData = (action: string, preFilters?: any) => {
        let filterData = filters.reduce((o, key) => ({...o, [key.id]: key.defaultValue}), {});
        if (dataSort) {
            filterData = {...filterData, sort: dataSort.defaultValue};
        }
        setData({ ...filterData, ...preFilters });
        if (action === 'onMount' && filterOnMount) {
            onFilter(filterData);
        }
        if (action === 'onClear' && filterOnClear) {
            onFilter(filterData);
        }
        if (action === 'onPreFilter' && filterOnPreFilter) {
            onFilter(filterData);
        }
    }

    const onSortChange = (srtData: IDataSortValues) => {
        if (dataSort) {
            setData((oldData: any) => {
                const filterData = {...oldData, sort: srtData };
                if (filterOnSort) {
                    onFilter(filterData);
                }
                return filterData;
            })
        }
    }

    useEffect(() => {
        if (filters) {
            setDefaultData('onMount');
        }
    }, [filters]);

    return (<Card sx={{ borderRadius: 0, marginBottom: '1rem' }}>
        <CardContent>
            {preFilters && <PreFilters {...preFilters} onPreFilter={(preFilters: any) => setDefaultData('onPreFilter', preFilters)} />}
            <Grid container {...gridContainerProps}>
                {data && filters.map(((filter: IFilter) => {
                    return <FilterWrapper key={`F_${filter.id}`} {...filter} value={data && data[filter.id]} onDataChange={setData} />
                }))}
            </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{justifyContent: dataSort? 'space-between': 'flex-end'}}>
            {(dataSort && data) && <DataSort {...dataSort} value={data && data.sort} onSortChange={onSortChange} />}
            <ButtonGroup variant="contained" size="small">
                <Button color="primary" disabled={loading} onClick={() => onFilter(data)}>{loading? "FILTERING":"FILTER"}</Button>
                <Button color="inherit" disabled={loading} onClick={() => setDefaultData('onClear')}>CLEAR</Button>
            </ButtonGroup>
        </CardActions>
    </Card>)
}

export default DataFilters;
