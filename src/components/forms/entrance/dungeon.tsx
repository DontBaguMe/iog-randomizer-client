import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Grid, Switch, FormControlLabel, Tooltip, FormGroup } from '@material-ui/core'
import { settingsStore } from '../../../stores/settings'

function DungeonShuffleForm() {
    const [dungeonShuffle, setDungeonShuffle] = useState(settingsStore.dungeonShuffle)

    function onDungeonShuffleToggle(event: React.ChangeEvent<HTMLInputElement>) {
        setDungeonShuffle(event.target.checked)
        settingsStore.dungeonShuffle = event.target.checked
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <FormGroup>
                    <Tooltip title="Shuffle around the interior layout of dungeons" placement="bottom-start">
                        <FormControlLabel
                            control={<Switch checked={dungeonShuffle} onChange={e => onDungeonShuffleToggle(e)} value="Dungeon Chaos" />}
                            label="Dungeon Chaos"
                        />
                    </Tooltip>
                </FormGroup>
            </Grid>
        </Grid>
    )
}

export default observer(DungeonShuffleForm)
