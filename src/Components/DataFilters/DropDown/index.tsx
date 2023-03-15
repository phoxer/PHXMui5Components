import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export interface IDropDownOption { 
    label: string;
    value: any;
}

type TSearchInput = {
    id: string;
    label: string;
    value: any;
    options: IDropDownOption[];
    onChange: React.Dispatch<any>;
    componentProps?: any;
}

const DropDown: React.FC<TSearchInput> = ({ id, label, value, options, onChange, componentProps }): JSX.Element  => {
    return (<TextField
        id={id}
        label={label}
        value={value}
        variant="outlined"
        size="small"
        select
        {...componentProps}
        fullWidth
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange((oldData: any) => {
                return {...oldData, [id]: event.target.value };
            });
        }}
    >
        {options.map((option: IDropDownOption, ix: number) => (
            <MenuItem key={`ddop${ix}`} value={option.value}>
              {option.label}
            </MenuItem>
        ))}
    </TextField>);
}

export default DropDown;