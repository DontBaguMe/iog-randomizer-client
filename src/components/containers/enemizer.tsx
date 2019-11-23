import React from 'react'
import { observer } from 'mobx-react'
import { EnemizerForm, BossShuffleForm } from '../forms'

import AccordionPanel from './accordion-panel'
import { Grid } from '@material-ui/core'

@observer
export default class EnemizerContainer extends React.Component {
    render() {
        return (
            <AccordionPanel title="Enemizer" id="enemizer" expanded={false}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <EnemizerForm />
                    </Grid>
                    <Grid item xs={6}>
                        <BossShuffleForm />
                    </Grid>
                </Grid>
            </AccordionPanel>
        )
    }
}
