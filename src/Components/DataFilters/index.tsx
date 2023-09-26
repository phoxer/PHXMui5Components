import { Button, ButtonGroup, Card, CardActions, CardContent, Divider } from "@mui/material";
import { useState } from "react";

type TFilters = {
    children: React.ReactNode;
    loading: boolean;
}

const DataFilters: React.FC<TFilters> = ({ children, loading }) => {
    const [data, setData] = useState<any>(null);

    return (<Card sx={{ borderRadius: 0, marginBottom: '1rem' }}>
        <CardContent>
            {children}
        </CardContent>
        <Divider />
        <CardActions sx={{justifyContent: 'flex-end'}}>
            <ButtonGroup variant="contained" size="small">
                <Button color="primary" disabled={loading} onClick={() => {}}>{loading? "FILTERING":"FILTER"}</Button>
                <Button color="inherit" disabled={loading} onClick={() => {}}>CLEAR</Button>
            </ButtonGroup>
        </CardActions>
    </Card>)
}

export default DataFilters;