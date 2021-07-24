import React from 'react'
import { observer } from 'mobx-react'
import { Grid } from '@material-ui/core'

import { SetAbilityLocationForm } from '../forms'
import { customizerStore } from '../../stores/customizer'

function CustomizerContainer() {
    function getItemCollection() {
        const abilities = customizerStore.Abilities

        const items = []
        let itemCount = 0
        for (var ability in abilities) {
            itemCount += 1

            let keyIterator = itemCount
            items.push(
                <Grid item xs={12} key={'grid_' + keyIterator}>
                    <SetAbilityLocationForm ability={ability} />
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

export default observer(CustomizerContainer)
