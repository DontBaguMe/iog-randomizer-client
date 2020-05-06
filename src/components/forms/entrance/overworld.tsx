import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Grid, Switch, FormControlLabel, Tooltip, FormGroup } from '@material-ui/core'
import { settingsStore } from '../../../stores/settings'

function OverworldShuffleForm() {
    const [overworldShuffle, setOverworldShuffle] = useState(settingsStore.overworldShuffle)

    function onOverworldShuffleToggle(event: React.ChangeEvent<HTMLInputElement>) {
        setOverworldShuffle(event.target.checked)
        settingsStore.dungeonShuffle = event.target.checked
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <FormGroup>
                    <Tooltip title="Not Yet Implemented" placement="bottom-start">
                        <FormControlLabel
                            control={<Switch disabled={true} checked={overworldShuffle} onChange={e => onOverworldShuffleToggle(e)} value="Overworld Shuffle" />}
                            label="Overworld Shuffle"
                        />
                    </Tooltip>
                </FormGroup>
            </Grid>
        </Grid>
    )
}

export default observer(OverworldShuffleForm)
