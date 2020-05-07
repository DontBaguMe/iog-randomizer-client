import React from 'react'
import { observer } from 'mobx-react'
import { FormSelect, InputGroup, InputGroupAddon, InputGroupText } from 'shards-react'
import { settingsStore } from '../../../stores/settings'

function GameLogicForm() {
    function onLogicChanged(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = parseInt(event.target.value)
        settingsStore.logic = value
    }

    return (
        <InputGroup>
            <InputGroupAddon type="prepend">
                <InputGroupText>Logic</InputGroupText>
            </InputGroupAddon>
            <FormSelect defaultValue={settingsStore.logic} onChange={(e) => onLogicChanged(e)}>
                <option value="0">Completable</option>
                <option value="1">Beatable</option>
                <option value="2">Chaos</option>
            </FormSelect>
        </InputGroup>
    )
}

export default observer(GameLogicForm)
