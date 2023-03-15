import { useCallback } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxItem from '../CheckBoxItem';
import { ICheckBoxList, ICheckBoxListValue, TCheckBoxReturn } from '../interfaces';

type TCheckBoxGroup = {
    label: string;
    checked: boolean;
    indeterminate: boolean;
    options: ICheckBoxList[];
    onChange: (checkBoxData: TCheckBoxReturn[]) => void;
}

const CheckBoxGroup: React.FC<TCheckBoxGroup> = ({ label, checked, indeterminate, options = [], onChange }): JSX.Element => {

    const checkGroupOptions = useCallback((e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const newOptions: TCheckBoxReturn[] = options.map((option: ICheckBoxListValue) => {
            return { checked, value: option.value || null } ;
        });
        onChange(newOptions)
    }, [options])

    return (<>
        <FormControlLabel
            sx={{ marginLeft: 0 }}
            label={label}
            control={
                <Checkbox
                    checked={checked}
                    indeterminate={indeterminate}
                    onChange={checkGroupOptions}
                />
            }
        />
        <Box sx={{ paddingLeft: '.8rem' }}>
            {options.map((option: ICheckBoxListValue, ix: number) => {
                return (<li key={`cbgi${ix}`}>
                    <CheckBoxItem label={option.label} value={option.value} checked={option.checked || false} onChange={onChange} />
                </li>)
            })}
        </Box>
    </>)
}

export default CheckBoxGroup;