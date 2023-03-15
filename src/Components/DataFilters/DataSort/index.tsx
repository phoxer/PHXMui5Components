import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { KeyboardArrowDown, ArrowDownward, ArrowUpward } from '@mui/icons-material';

export type TSOrder = "desc" | "asc";

export interface IDataSortValues {
    field: string;
    order: TSOrder;
}

export interface IDataSortOptions {
    label: string;
    value: string;
    selected?: boolean;
}

export interface IDataSort {
    defaultValue: IDataSortValues | IDataSortValues[];
    options: IDataSortOptions[];
}

interface IDataSortComponent extends IDataSort {
    value: IDataSortValues;
    onSortChange: (sort: IDataSortValues) => void;
}

const DataSort: React.FC<IDataSortComponent> = ({ value, options, onSortChange }): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [listOptions, setListOptions] = useState<null | IDataSortOptions[]>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const newListOptions: IDataSortOptions[] = options.map((option: IDataSortOptions) => {
            if(value.field === option.value) {
                return {...option, selected: true }
            }
            return {...option};
        });
        setListOptions(newListOptions);
    }, [value])

    const onDataSortChange = ({ field, order }: IDataSortValues) => {
        onSortChange({ field, order });
        handleClose();
    }

    const label = listOptions? listOptions.find((option: IDataSortOptions) => {
        return option.selected;
    })?.label: "Sort By";

    return (<Box>
        <Box>
            <Button
                id={`btn-sortData`}
                variant="text"
                color="inherit"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDown />}
            >
                {label}
            </Button>
            <IconButton onClick={() => onDataSortChange({ field: value.field, order: value.order === "asc"? "desc" : "asc" })}>
                {(value.order === "asc") ?  <ArrowUpward /> : <ArrowDownward />}
            </IconButton>
        </Box>
        <Menu
            id={`sortData`}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            variant="menu"
        >
            {listOptions && listOptions.map((option: IDataSortOptions, ix: number) => {
                return (<MenuItem key={`srt${ix}`} selected={option.selected} onClick={() => onDataSortChange({ field: option.value, order: value.order })}>
                    {option.label}
                </MenuItem>);
            })}
        </Menu>
    </Box>)
}

export default DataSort;