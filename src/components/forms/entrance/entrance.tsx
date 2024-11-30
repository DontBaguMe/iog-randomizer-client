import React, { useState } from 'react'
import { observer } from 'mobx-react'
import {FormControlLabel, FormGroup, Grid, Switch, Tooltip} from '@material-ui/core'
import { settingsStore } from '../../../stores/settings'

function EntranceShuffleForm() {
    const [townShuffle, setTownShuffle] = useState(settingsStore.townShuffle)
    const [coupledExits, setCoupledExits] = useState(settingsStore.coupledExits)

    function onTownShuffleToggle(event: React.ChangeEvent<HTMLInputElement>) {
        setTownShuffle(event.target.checked)
        settingsStore.townShuffle = event.target.checked
    }
    function onCoupledExitsToggle(event: React.ChangeEvent<HTMLInputElement>) {
        setCoupledExits(event.target.checked)
        settingsStore.coupledExits = event.target.checked
    }


    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <FormGroup>
                    <Tooltip title="Shuffle around the doors inside of towns" placement="bottom-start">
                        <FormControlLabel
                            control={<Switch checked={townShuffle} onChange={e => onTownShuffleToggle(e)} value="Town Shuffle" />}
                            label="Town Shuffle"
                        />
                    </Tooltip>
                </FormGroup>
            </Grid>
            <Grid item xs={6}>
                <FormGroup>
                    <Tooltip title="Ensure that entrance and exits stay coupled." placement="bottom-start">
                        <FormControlLabel
                            control={<Switch checked={coupledExits} onChange={e => onCoupledExitsToggle(e)} value="Coupled Exits" />}
                            label="Coupled Exits"
                        />
                    </Tooltip>
                </FormGroup>
            </Grid>
        </Grid>
    )
}

export default observer(EntranceShuffleForm)
