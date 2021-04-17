import React from 'react'
import { observer } from 'mobx-react'
import { Grid } from '@material-ui/core'

import { SetWeightForm } from '../forms'
import AccordionPanel from './accordion-panel'
import { mysteryStore } from '../../stores/mystery'

function MysteryContainer() {
    function getItemCollection() {
        const weekly = mysteryStore.Weights.Weekly

        const items = []
        let itemCount = 0
        for (var property in weekly) {
            itemCount += 1

            let local_items = []

            let keyIterator = itemCount
            for (var category in weekly[property]) {
                local_items.push(
                    <Grid item xs={12} key={'grid_' + keyIterator}>
                        <SetWeightForm property={property} category={category} />
                    </Grid>,
                )

                ++keyIterator
            }

            items.push(
                <Grid item xs={3} key={itemCount}>
                    <AccordionPanel title={property} id={'mystery_p_' + itemCount} expanded={false}>
                        <Grid container spacing={2}>
                            {local_items}
                        </Grid>
                    </AccordionPanel>
                </Grid>,
            )
        }

        return items
    }

    return (
        <Grid container spacing={1}>
            {getItemCollection()}
        </Grid>
    )
}

export default observer(MysteryContainer)
