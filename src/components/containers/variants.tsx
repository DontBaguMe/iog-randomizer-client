import React from 'react'
import { observer } from 'mobx-react'
import {StartLocationForm, GameLogicForm, FluteForm, DarkRoomsForm} from '../forms'

import AccordionPanel from './accordion-panel'
import { Grid } from '@material-ui/core'
import VariationTogglesForm from '../forms/variants/toggles'

@observer
export default class VariantsContainer extends React.Component {
    render() {
        return (
            <AccordionPanel title="Variants" id="variants" expanded={false}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <StartLocationForm />
                    </Grid>
                    <Grid item xs={6}>
                        <GameLogicForm />
                    </Grid>
                    <Grid item xs={12}>
                        <VariationTogglesForm />
                    </Grid>
                    <Grid item xs={6}>
                        <DarkRoomsForm />
                    </Grid>
                    <Grid item xs={6}>
                        <FluteForm />
                    </Grid>
                </Grid>
            </AccordionPanel>
        )
    }
}
