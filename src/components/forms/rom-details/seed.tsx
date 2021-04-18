import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { FormInput, InputGroup, InputGroupAddon, InputGroupText, Button } from 'shards-react'

import { settingsStore } from '../../../stores/settings'
import { generateRandomSeedValue } from '../../../functions/generate-random'

function SeedForm() {
    const [seed, setSeed] = useState(settingsStore.seed)

    function onSeedTextChange(event: React.ChangeEvent<HTMLInputElement>) {
        const seed = parseInt(event.target.value)

        setSeed(seed)
        settingsStore.seed = seed
    }

    function onNewSeedClient() {
        const seed = generateRandomSeedValue()

        setSeed(seed)
        settingsStore.seed = seed
    }

    return (
        <InputGroup>
            <InputGroupAddon type="prepend">
                <InputGroupText>Seed</InputGroupText>
            </InputGroupAddon>
            <FormInput aria-label="Input for Seed Value" value={seed} onChange={(e) => onSeedTextChange(e)} type="number" />

            <InputGroupAddon type="append">
                <Button color="secondary" onClick={onNewSeedClient}>
                    New Seed
                </Button>
            </InputGroupAddon>
        </InputGroup>
    )
}

export default observer(SeedForm)
