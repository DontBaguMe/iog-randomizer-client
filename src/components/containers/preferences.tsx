import React from 'react'
import { Grid } from '@material-ui/core'

import AccordionPanel from './accordion-panel'
import PlayAs from '../forms/preferences/play-as'

function PreferencesContainer() {
    return (
        <AccordionPanel title="Preferences" id="preferences" expanded={false}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PlayAs />
                </Grid>
            </Grid>
        </AccordionPanel>
    )
}

export default PreferencesContainer
