import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { InputGroup, InputGroupAddon, InputGroupText, FormSelect } from 'shards-react'
import { Grid, Tooltip } from '@material-ui/core'
import { settingsStore } from '../../../stores/settings'

function EntranceShuffleForm() {
    const [entranceShuffle, setEntranceShuffleValue] = useState(settingsStore.entranceShuffle)

    function onEntranceShuffleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = parseInt(event.target.value)

        setEntranceShuffleValue(value)
        settingsStore.entranceShuffle = value
    }

    const tooltip = <>
        <span>This setting shuffles where doors and other exits take you.</span>
        <br />
        <br />
        <span>In Coupled mode, doors and exits act normally, i.e. if you backtrack through an exit you'll return to where you entered.</span>
        <br />
        <br />
        <span>In Uncoupled, doors and exits can send you to different places depending on which direction you go through them.</span>
    </>

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <InputGroup>
                    <InputGroupAddon type="prepend">
                        <InputGroupText>Entrance Shuffle</InputGroupText>
                    </InputGroupAddon>
                    <Tooltip title={tooltip} placement="bottom-start">
                        <FormSelect defaultValue={entranceShuffle} onChange={e => onEntranceShuffleChange(e)}>
                            <option value="0">None</option>
                            <option value="1">Coupled</option>
                            <option value="2">Uncoupled</option>
                        </FormSelect>
                    </Tooltip>
                </InputGroup>
            </Grid>
        </Grid>
    )
}

export default observer(EntranceShuffleForm)
