import React from 'react'
import { observer } from 'mobx-react'
import { FormSelect, InputGroup, InputGroupAddon, InputGroupText } from 'shards-react'
import { settingsStore } from '../../../stores/settings'

function StartLocationForm() {
    function onStartLocationChanged(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = parseInt(event.target.value)
        settingsStore.startLocation = value
    }

    return (
        <InputGroup>
            <InputGroupAddon type="prepend">
                <InputGroupText>Starting Location</InputGroupText>
            </InputGroupAddon>
            <FormSelect defaultValue={settingsStore.startLocation} onChange={(e) => onStartLocationChanged(e)}>
                <option value="0">South Cape</option>
                <option value="1">Safe</option>
                <option value="2">Unsafe</option>
                <option value="3">Forced Unsafe</option>
            </FormSelect>
        </InputGroup>
    )
}

export default observer(StartLocationForm)
