import React, { Fragment } from 'react'
import { observer } from 'mobx-react'
import {
    FormInput,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from 'shards-react'

import { Button, Tooltip, Grid } from '@material-ui/core'
import RedoIcon from '@material-ui/icons/Redo'

import detailsStore from '../../../stores/details'

@observer
export default class SeedForm extends React.Component {
    state = {
        seedValue: detailsStore.seed,
    }

    constructor(props) {
        super(props)

        this.handleSeedChange = this.handleSeedChange.bind(this)
        this.handleRandomizeSeed = this.handleRandomizeSeed.bind(this)
    }

    handleSeedChange(value) {
        detailsStore.setSeed(value)
        this.setState({
            seedValue: value,
        })
    }

    handleRandomizeSeed() {
        detailsStore.randomizeSeed()
        this.setState({
            seedValue: detailsStore.seed,
        })
    }

    render() {
        return (
            <Fragment>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <InputGroup>
                            <InputGroupAddon type="prepend">
                                <InputGroupText>Seed</InputGroupText>
                            </InputGroupAddon>
                            <FormInput
                                value={this.state.seedValue}
                                onChange={e =>
                                    this.handleSeedChange(
                                        parseInt(e.target.value),
                                    )
                                }
                                type="text"
                            />
                        </InputGroup>
                    </Grid>
                    <Grid item xs>
                        <Tooltip title="Randomize Seed">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleRandomizeSeed}>
                                <RedoIcon />
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}
