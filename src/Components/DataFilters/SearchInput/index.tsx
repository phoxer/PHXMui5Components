import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Search } from '@mui/icons-material';
import isEmpty from "lodash/isEmpty";

type TSearchInput = {
    id: string;
    label: string;
    value: string | null;
    onChange: React.Dispatch<any>;
    componentProps?: any;
}

const SearchInput: React.FC<TSearchInput> = ({ id, label, value, onChange, componentProps }): JSX.Element => {
    return <TextField
        id={id}
        value={value || ""}
        label={label}
        variant="outlined"
        size="small"
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
                return {...oldData, [id]: isEmpty(event.target.value)? null : event.target.value };
            });
        }}
    />
}

export default SearchInput;