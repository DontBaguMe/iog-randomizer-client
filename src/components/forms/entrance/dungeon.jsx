import React from 'react'
import { observer } from 'mobx-react'

import entranceStore from '../../../stores/entrance'

import { Grid, Switch, FormControlLabel, Tooltip, FormGroup } from '@material-ui/core';

const DungeonShuffleForm = observer(
    class DungeonShuffleForm extends React.Component {
        render() {
            return (
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <FormGroup>
                            <Tooltip title="Not Yet Implemented" placement="bottom-start">
                                <FormControlLabel control={<Switch checked={entranceStore.dungeonShuffle} onChange={e => entranceStore.setDungeonShuffle(e.target.checked)} value="Dungeon Shuffle" />} label="Dungeon Shuffle" />
                            </Tooltip>
                        </FormGroup>
                    </Grid>
                </Grid>
            )
        }
    }
)

export default DungeonShuffleForm