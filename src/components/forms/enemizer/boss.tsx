import React from 'react'
import { observer } from 'mobx-react'

import enemizerStore from '../../../stores/enemizer'
import { FormGroup, FormControlLabel, Switch, Tooltip } from '@material-ui/core'

@observer
export default class BossShuffleForm extends React.Component {
    render() {
        return (
            <FormGroup>
                <Tooltip title="Shuffles the placement of boss enemies (Not Yet Implemented)" placement="bottom-start">
                    <FormControlLabel
                        control={
                            <Switch disabled={true} checked={enemizerStore.bossShuffle} onChange={e => enemizerStore.setBossShuffle(e.target.checked)} value="Boss Shuffle" />
                        }
                        label="Boss Shuffle"
                    />
                </Tooltip>
            </FormGroup>
        )
    }
}
