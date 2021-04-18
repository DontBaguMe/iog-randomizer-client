import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

interface Props {
    id: string
    title: string
    expanded: boolean
    style?: React.CSSProperties
    contentStyle?: React.CSSProperties
}

function AccordionPanel(props: React.PropsWithChildren<Props>) {
    const [expanded, setExpanded] = useState(props.expanded)

    function handlePanelChange(expanded) {
        setExpanded(expanded)
    }

    return (
        <div style={props.style}>
            <Accordion expanded={expanded} onChange={(e, expanded) => handlePanelChange(expanded)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">{props.title}</Typography>
                </AccordionSummary>
                <AccordionDetails style={props.contentStyle}>{props.children}</AccordionDetails>
            </Accordion>
        </div>
    )
}

export default observer(AccordionPanel)
