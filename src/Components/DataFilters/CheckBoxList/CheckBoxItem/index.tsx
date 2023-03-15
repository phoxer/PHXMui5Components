import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { TCheckBoxReturn } from '../interfaces';

export type TCheckBox = {
    label: string;
    checked: boolean;
    value: any,
    onChange: (checkBoxData: TCheckBoxReturn[]) => void;
}

const CheckBoxItem: React.FC<TCheckBox> = ({ label, value, checked, onChange }): JSX.Element => {
    return (<FormControlLabel
        sx={{ marginLeft: 0 }}
        label={label}
        control={<Checkbox checked={checked} onChange={() => onChange([{ checked: !checked, value }])} size="small" />}
    />)
}

export default CheckBoxItem;