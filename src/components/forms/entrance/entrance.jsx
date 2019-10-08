import React from 'react'
import { observer } from 'mobx-react'
import { InputGroup, InputGroupAddon, InputGroupText, FormSelect } from 'shards-react'

import entranceStore from '../../../stores/entrance'

import { Grid, Tooltip } from '@material-ui/core'

const EntranceShuffleForm = observer(
    class EntranceShuffleForm extends React.Component {
        render() {
            return (
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <InputGroup>
                            <InputGroupAddon type="prepend">
                                <InputGroupText>Entrance Shuffle</InputGroupText>
                            </InputGroupAddon>
                            <Tooltip title="Not Yet Implemented" placement="bottom-start">
                                <FormSelect disabled={true} defaultValue={entranceStore.entranceShuffle} onChange={(v) => entranceStore.setEntranceShuffle(v.target.value)}>
                                    <option value="None">None</option>
                                    <option value="Coupled">Coupled</option>
                                    <option value="Uncoupled">Uncoupled</option>
                                </FormSelect>
                            </Tooltip>
                        </InputGroup>
                    </Grid>
                </Grid>
            )
        }
    }
)

export default EntranceShuffleForm