//** 1.0.0 | www.phoxer.com */
import { TableCell, TableRow, CircularProgress } from "@mui/material";

type TTableLoading = {
    colSpan: number;
}

const TableLoading: React.FC<TTableLoading> = ({ colSpan }) => {
    return (<TableRow>
        <TableCell align='center' colSpan={colSpan}>
            <CircularProgress />
        </TableCell>
    </TableRow>)
};

export default TableLoading;