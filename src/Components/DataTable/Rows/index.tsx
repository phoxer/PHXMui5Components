//** 1.0.0 | www.phoxer.com */
import { TableRow as Row, TableCell } from "@mui/material";
import { TDataTableColumn } from '../index';

type TTableRow = {
    columns: TDataTableColumn[];
    fieldData: any;
}

const TableRow: React.FC<TTableRow> = ({ columns, fieldData }) => {
    return (<Row>
        {columns.map(({ field, head, cell, component }: TDataTableColumn) => {
            return (<TableCell
                key={`${field}`}
                align={cell?.align}
                padding={cell?.padding}
                width={head.width}
            >
                {component(fieldData[field], fieldData)}
            </TableCell>);
        })}
    </Row>)
}

export default TableRow;