import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { FormGroup, FormControlLabel, Switch, Tooltip } from '@material-ui/core'
import { settingsStore } from '../../../stores/settings'

function BossShuffleForm() {
    const [bossShuffle, setBossShuffle] = useState(settingsStore.bossShuffle)

    function onBossShuffleToggle(event: React.ChangeEvent<HTMLInputElement>) {
        setBossShuffle(event.target.checked)
        settingsStore.bossShuffle = event.target.checked
    }

    return (
        <FormGroup>
            <Tooltip title="Shuffles the placement of boss enemies" placement="bottom-start">
                <FormControlLabel control={<Switch checked={bossShuffle} onChange={e => onBossShuffleToggle(e)} value="Boss Shuffle" />} label="Boss Shuffle" />
            </Tooltip>
        </FormGroup>
    )
}

export default observer(BossShuffleForm)
