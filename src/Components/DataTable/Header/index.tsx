//** 1.0.0 | www.phoxer.com */
import { TableHead as Head, TableRow, TableCell } from "@mui/material";
import { TDataTableColumn } from '../index';

type TTableHead = {
    columns: TDataTableColumn[];
}

const TableHead: React.FC<TTableHead> = ({ columns }) => {
    return (<Head>
        <TableRow>
            {columns.map(({ field, head }: TDataTableColumn) => {
                const { label, align, padding, width } = head;
                return (<TableCell
                    key={`${field}`}
                    align={align}
                    padding={padding}
                    sortDirection="desc"
                    width={width}
                >
                    {label}
                </TableCell>);
            })}
        </TableRow>
    </Head>)
}

export default TableHead;