import React from 'react'
import { observer } from 'mobx-react'
import { FormSelect, InputGroup, InputGroupAddon, InputGroupText } from 'shards-react'
import { settingsStore } from '../../../stores/settings'

function DarkRoomsForm() {
    function onLogicChanged(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = parseInt(event.target.value)
        settingsStore.logic = value
    }

    return (
        <InputGroup>
            <InputGroupAddon type="prepend">
                <InputGroupText>Dark rooms (BETA)</InputGroupText>
            </InputGroupAddon>
            <FormSelect defaultValue={settingsStore.darkRooms} onChange={(e) => onLogicChanged(e)}>
                <option value="0">None</option>
                <option value="1">A few</option>
                <option value="2">Some</option>
                <option value="3">Many</option>
                <option value="4">All of them</option>
            </FormSelect>
        </InputGroup>
    )
}

export default observer(DarkRoomsForm)
