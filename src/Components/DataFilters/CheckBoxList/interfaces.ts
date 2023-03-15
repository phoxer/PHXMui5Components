export type TValue = string | number | null;

export interface ICheckBoxList {
    label: string;
    value?: TValue;
    options?: ICheckBoxList[];
}

export interface ICheckBoxListValue extends ICheckBoxList  {
    checked?: boolean;
    indeterminate?: boolean;
}

export type TCheckBoxReturn = { 
    checked: boolean;
    value: TValue;
}