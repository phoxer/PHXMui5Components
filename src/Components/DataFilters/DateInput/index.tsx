import dayjs ,{ Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type TDatePicker = {
    id: string;
    label: string;
    value: string;
    componentProps?: any;
    onChange: React.Dispatch<any>;
}

const DateInput: React.FC<TDatePicker> = ({ id, label, value, onChange, componentProps }): JSX.Element => {

    const onDateChange = (selectedDate: Dayjs | null) => {
        onChange((oldData: any) => {
            return {...oldData, [id]: selectedDate?.format("YYYY-MM-DD") };
        });
    };

    console.log(value)

    return (<LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            label={label}
            value={dayjs(value)}
            onChange={onDateChange}
            {...componentProps}
            inputFormat="YYYY-MM-DD"
            slotProps= {{
                textField: {
                    size: 'small',
                    variant: "outlined",
                    fullWidth: true,
                    readOnly: true
                }
            }}
        />
    </LocalizationProvider>);
}

export default DateInput;