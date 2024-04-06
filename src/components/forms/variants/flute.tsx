import React from 'react'
import { observer } from 'mobx-react'
import { FormSelect, InputGroup, InputGroupAddon, InputGroupText } from 'shards-react'
import { settingsStore } from '../../../stores/settings'

function FluteForm() {
    function onLogicChanged(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = parseInt(event.target.value)
        settingsStore.logic = value
    }

    return (
        <InputGroup>
            <InputGroupAddon type="prepend">
                <InputGroupText>Will's Flute</InputGroupText>
            </InputGroupAddon>
            <FormSelect defaultValue={settingsStore.flute} onChange={(e) => onLogicChanged(e)}>
                <option value="0">Available from start</option>
                <option value="1">Shuffled</option>
                <option value="2">Flute-less</option>
            </FormSelect>
        </InputGroup>
    )
}

export default observer(FluteForm)
