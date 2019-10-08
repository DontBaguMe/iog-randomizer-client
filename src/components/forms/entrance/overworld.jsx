import React from 'react'
import { observer } from 'mobx-react'

import entranceStore from '../../../stores/entrance'

import { Grid, Switch, FormControlLabel, Tooltip, FormGroup } from '@material-ui/core';

const OverworldShuffleForm = observer(
    class OverworldShuffleForm extends React.Component {
        render() {
            return (
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <FormGroup>
                            <Tooltip title="Not Yet Implemented" placement="bottom-start">
                                <FormControlLabel disabled={true} control={<Switch checked={entranceStore.overworldShuffle} onChange={e => entranceStore.setOverworldShuffle(e.target.checked)} value="Overworld Shuffle" />} label="Overworld Shuffle" />
                            </Tooltip>
                        </FormGroup>
                    </Grid>
                </Grid>
            )
        }
    }
)

export default OverworldShuffleForm