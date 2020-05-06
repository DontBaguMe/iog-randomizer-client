import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

interface Props {
    id: string
    title: string
    expanded: boolean
    style?: React.CSSProperties
}

function AccordionPanel(props: React.PropsWithChildren<Props>) {
    const [expanded, setExpanded] = useState(props.expanded)

    function handlePanelChange(expanded) {
        setExpanded(expanded)
    }

    return (
        <div style={props.style}>
            <ExpansionPanel expanded={expanded} onChange={(e, expanded) => handlePanelChange(expanded)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">{props.title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>{props.children}</ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
}

export default observer(AccordionPanel)
