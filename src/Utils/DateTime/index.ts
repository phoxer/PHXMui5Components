import { format } from 'date-fns';

export const formatDate = (date: Date | number, timeFormat: string): string => {
    return format(date, timeFormat);
};