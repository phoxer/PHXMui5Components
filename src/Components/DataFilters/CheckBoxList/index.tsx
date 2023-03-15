import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import CheckBoxItem from './CheckBoxItem';
import CheckBoxGroup from './CheckBoxGroup';
import { KeyboardArrowDown } from '@mui/icons-material';
import { ICheckBoxList, ICheckBoxListValue, TValue, TCheckBoxReturn } from './interfaces';

type TCheckBoxList = {
    id: string;
    label: string;
    value: any;
    options: ICheckBoxList[];
    onChange: React.Dispatch<any>;
    componentProps?: any;
}

const CheckBoxList: React.FC<TCheckBoxList> = ({ id, label, options, value, onChange, componentProps }): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [listOptions, setListOptions] = useState<ICheckBoxListValue[]>([]);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onCheckBoxChange = (checkData: TCheckBoxReturn[]) => {
        onChange((oldData: any) => {
            let newValues: TValue[] = oldData[id] && [...oldData[id]] || [];
            checkData.forEach((chkData: TCheckBoxReturn) => {
                const ix = newValues.indexOf(chkData.value);
                if(chkData.checked && (ix === -1)){
                    newValues.push(chkData.value)
                } else if(!chkData.checked && ix > -1) {
                    newValues.splice(ix, 1);
                }
            });
            return {...oldData, [id]: newValues };
        });
    }

    const checkGroupOptions = (group: ICheckBoxList): ICheckBoxListValue => {
        let newOptions: ICheckBoxListValue[] = [];
        let numChecked: number = 0;
        let numOptions: number = 0;
        if (group && group.options) {
            numOptions = group.options?.length; 
            newOptions = group.options.map((option: ICheckBoxListValue) => {
                if(option.options) {
                    console.log('more option??', option);
                    // return checkGroupOptions(opt);
                }
                const checked = value && value.includes(option.value);
                if (checked){
                    numChecked ++;
                }
                return {...option, checked};
            });
        }
        const checked = (numChecked === numOptions);
        const indeterminate = (!checked && numChecked > 0);
        return {...group, options: newOptions, checked, indeterminate };
    };

    useEffect(() => {
        const newOptions: ICheckBoxListValue[] = options.map((option: ICheckBoxListValue) => {
            if(option.options) {
                return checkGroupOptions(option);
            }
            return {...option, checked: value && value.includes(option.value)};
        });
        setListOptions(newOptions);
    }, [options, value]);

    return (<>
        <Button
            id={`btn-${id}`}
            variant="outlined"
            color="inherit"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDown />}
            sx= {{justifyContent: 'space-between'}}
            {...componentProps}
            fullWidth
        >
            {label}
        </Button>
        <Menu
            id={`mn${id}`}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            variant="menu"
        >
            {listOptions && listOptions.map((option: ICheckBoxListValue, ix: number) => {
                if (option.options) {
                    return <CheckBoxGroup key={`cbg${ix}`} label={option.label} indeterminate={option.indeterminate || false} checked={option.checked || false} options={option.options} onChange={onCheckBoxChange} />
                }
                return (<li key={`cbi${ix}`}>
                    <CheckBoxItem label={option.label} value={option.value} checked={option.checked || false} onChange={onCheckBoxChange} />
                </li>)
            })}
        </Menu>
    </>);
}

export default CheckBoxList;