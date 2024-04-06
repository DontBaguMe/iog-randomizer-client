import React from 'react'
import { Grid } from '@material-ui/core'

import AccordionPanel from './accordion-panel'
import PlayAs from '../forms/preferences/play-as'
import MuteMusic from '../forms/preferences/mute-music'
import {PermalinkedRom} from "../../models/rom/permalinked-rom";

type Props = {
    style?: React.CSSProperties
    rom?: PermalinkedRom
}

function PreferencesContainer(props: Props) {
    return (
        <AccordionPanel title="Preferences" id="preferences" expanded={false} style={props.style}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PlayAs rom={props.rom} />
                </Grid>
                <Grid item xs={12}>
                    <MuteMusic />
                </Grid>
            </Grid>
        </AccordionPanel>
    )
}

export default PreferencesContainer
