import React from 'react'
import { observer } from 'mobx-react'
import { Grid } from '@material-ui/core'

import { EntranceShuffleForm, DungeonShuffleForm, OverworldShuffleForm } from '../forms'
import AccordionPanel from './accordion-panel'

@observer
export default class EntranceContainer extends React.Component {
    render() {
        return (
            <AccordionPanel title="Entrance Randomizer (Coming Soon)" id="entrance" expanded={false}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <EntranceShuffleForm />
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <DungeonShuffleForm />
                            </Grid>
                            <Grid item xs={12}>
                                <OverworldShuffleForm />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AccordionPanel>
        )
    }
}
