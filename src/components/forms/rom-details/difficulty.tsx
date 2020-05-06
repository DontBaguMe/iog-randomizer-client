import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { InputGroup, InputGroupAddon, InputGroupText, FormSelect } from 'shards-react'
import { settingsStore } from '../../../stores/settings'

function DifficultyForm() {
    const [difficulty, setDifficulty] = useState(settingsStore.difficulty)

    function onDifficultyChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = parseInt(event.target.value)

        setDifficulty(value)
        settingsStore.difficulty = value
    }

    return (
        <InputGroup>
            <InputGroupAddon type="prepend">
                <InputGroupText>Difficulty</InputGroupText>
            </InputGroupAddon>
            <FormSelect aria-label="Input for Seed Difficulty" defaultValue={difficulty} onChange={e => onDifficultyChange(e)}>
                <option value="0">Easy</option>
                <option value="1">Normal</option>
                <option value="2">Hard</option>
                <option value="3">Extreme</option>
            </FormSelect>
        </InputGroup>
    )
}

export default observer(DifficultyForm)
