//** 1.0.0 | www.phoxer.com */
import { TableContainer, Table, TableBody } from "@mui/material";
import TableHead from './Header';
import Rows from './Rows';
import TableLoading from './Loading';
import { isNotNil } from "ramda";

type TDataTableCell = {
    align?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
    padding?: 'checkbox' | 'none' | 'normal';
    width?: number | string;
}

type TDataTableHead = {
    label: string;
}

export type TDataTableColumn = {
    field: string;
    head: TDataTableCell & TDataTableHead;
    cell?: TDataTableCell;
    component: (fieldValue: any, rowData: any) => React.ReactNode;
}

type IDataTable<T> = {
    columns: TDataTableColumn[];
    data: T[];
    loading: boolean;
    minHeight?: string | number;
    showBorders?: boolean;
    size?: 'small' | 'medium';
}

const DataTable: React.FC<IDataTable<any>> = ({ columns, loading, data = [], minHeight, size='small' }) => {
    return (<TableContainer>
        <Table size={size}>
            <TableHead columns={columns} />
            <TableBody sx={{minHeight}}>
                {loading && <TableLoading colSpan={columns ? columns.length : 1000} />}
                {!loading && isNotNil(data) && data.map((fieldData: any, index: number) => {
                    return <Rows key={`row-${index}`} columns={columns} fieldData={fieldData} />
                })}
            </TableBody>
        </Table>
    </TableContainer>)
}

export default DataTable;