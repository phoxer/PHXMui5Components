import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import MenuIcon from '../MenuIcon';

export type IAccordionList = {
    id: string;
    title: string | undefined;
    children: React.ReactNode;
    expanded?: boolean;
    icon?: JSX.Element;
}

const SAccordion = styled(Accordion)`
    box-shadow: none;
    background-color: unset;
    background: unset;
    border: none;
    .MuiAccordionSummary-content: {
        margin: 0 !important;
    }
    .Mui-expanded {
        margin: 0 !important;
        min-height: 0 !important;
    }
    .MuiButtonBase-root {
        margin: 0 !important;
        min-height: 0 !important;
    }
    ::before {
        background-color: unset;
        background: unset;
        border: none;
    }
`

const SAccordionSummary = styled(AccordionSummary)`
    margin: 0;
    padding: 0px 5px;
    min-height: 0 ;
    height: 25px;
    .content: {
        margin: 0 !important;
    }
    .Mui-expanded {
        margin: 0 !important;
        min-height: 0 !important;
    }
    .MuiButtonBase-root {
        margin: 0 !important;
        min-height: 0 !important;
    }
`

const SAccordionDetails = styled(AccordionDetails)`
    padding: 0;
`

const SAccordionTitle = styled(Typography)`
    font-size: .9rem;
    line-height: 1.2rem;
    font-weight: 800;
`

const AccordionList: React.FC<IAccordionList> = ({ id, title, icon, expanded = false, children }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(expanded);

    return (<SAccordion expanded={isExpanded} onChange={() => setIsExpanded(!isExpanded)} disableGutters>
        <SAccordionSummary expandIcon={<ExpandMoreIcon />} id={id}>
            {icon && <MenuIcon icon={icon} />}
            <SAccordionTitle>
                {title}
            </SAccordionTitle>
        </SAccordionSummary>
        <SAccordionDetails>
            { children }
        </SAccordionDetails>
    </SAccordion>);
}

export default AccordionList;