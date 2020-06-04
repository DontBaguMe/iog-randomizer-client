import React from 'react'
import { Grid } from '@material-ui/core'

import AccordionPanel from './accordion-panel'
import PlayAs from '../forms/preferences/play-as'

type Props = {
    style?: React.CSSProperties
}

function PreferencesContainer(props: Props) {
    return (
        <AccordionPanel title="Preferences" id="preferences" expanded={false} style={props.style}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PlayAs />
                </Grid>
            </Grid>
        </AccordionPanel>
    )
}

export default PreferencesContainer
