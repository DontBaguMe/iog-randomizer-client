import React from 'react'
import { observer } from 'mobx-react'
import { SetWeightForm } from '../forms'

import AccordionPanel from './accordion-panel'
import { Grid } from '@material-ui/core'

import { mysteryStore } from '../../stores/mystery'

@observer
export default class MysteryContainer extends React.Component {

    render() {
        let items = []
        let prop_count = 0
        for (var property in mysteryStore.weights) {
            prop_count += 1
            let local_items = []
            for (var category in mysteryStore.weights[property]) {
                local_items.push(<Grid item xs={12}>
                    <SetWeightForm property={property} category={category} />
                </Grid>)
            }
            items.push(
                <Grid item xs={3}>
                    <AccordionPanel title={property} id={"mystery_p_"+prop_count} expanded={false}>
                        <Grid container spacing={2}>
                            {local_items}
                        </Grid>
                    </AccordionPanel>
                </Grid>)
        }
        return (
            <Grid container spacing={1}>
                {items}
            </Grid>
        )
    }
}
