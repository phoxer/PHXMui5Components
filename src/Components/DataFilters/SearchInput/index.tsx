import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Search } from '@mui/icons-material';
import { isEmpty } from 'ramda';

type TSearchInput = {
    label: string;
    key: string;
    value: string | null;
    onChange: React.Dispatch<any>;
    componentProps?: any;
}

const SearchInput: React.FC<TSearchInput> = ({ label, key, value, onChange, componentProps }): JSX.Element => {
    return <TextField
        id={key}
        value={value || ""}
        label={label}
        {...componentProps}
        InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
        }}
        fullWidth
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange((oldData: any) => {
                return {...oldData, [key]: isEmpty(event.target.value)? null : event.target.value };
            });
        }}
    />
}

export default SearchInput;