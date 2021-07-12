import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Grid, Switch, FormControlLabel, Tooltip, FormGroup } from '@material-ui/core'
import { settingsStore } from '../../../stores/settings'

function MuteMusicForm() {
    const [muteMusic, setMuteMusic] = useState(settingsStore.muteMusic)

    function onMuteMusicToggle(event: React.ChangeEvent<HTMLInputElement>) {
        setMuteMusic(event.target.checked)
        settingsStore.muteMusic = event.target.checked
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <FormGroup>
                    <Tooltip title="Mute background music during the game" placement="bottom-start">
                        <FormControlLabel
                            control={<Switch checked={muteMusic} onChange={e => onMuteMusicToggle(e)} value="Mute MUsic" />}
                            label="Mute Music"
                        />
                    </Tooltip>
                </FormGroup>
            </Grid>
        </Grid>
    )
}

export default observer(MuteMusicForm)
