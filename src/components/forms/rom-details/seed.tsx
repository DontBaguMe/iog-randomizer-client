import React from 'react'
import { observer } from 'mobx-react'
import { FormInput, InputGroup, InputGroupAddon, InputGroupText, Button } from 'shards-react'

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
            <InputGroup>
                <InputGroupAddon type="prepend">
                    <InputGroupText>Seed</InputGroupText>
                </InputGroupAddon>
                <FormInput aria-label="Input for Seed Value" value={this.state.seedValue} onChange={e => this.handleSeedChange(parseInt(e.target.value))} type="text" />

                <InputGroupAddon type="append">
                    <Button color="secondary" onClick={this.handleRandomizeSeed}>
                        New Seed
                    </Button>
                </InputGroupAddon>
            </InputGroup>
        )
    }
}
