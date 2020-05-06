import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { InputGroup, InputGroupAddon, InputGroupText, FormSelect } from 'shards-react'

import { Tooltip } from '@material-ui/core'
import { settingsStore } from '../../../stores/settings'

function EnemizerForm() {
    const [enemizer, setEnemizerValue] = useState(settingsStore.enemizer)

    function onEnemizerValueChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = parseInt(event.target.value)

        setEnemizerValue(value)
        settingsStore.enemizer = value
    }

    return (
        <InputGroup>
            <InputGroupAddon type="prepend">
                <InputGroupText>Enemizer (Beta)</InputGroupText>
            </InputGroupAddon>
            <Tooltip title="Enemizer is currently in beta" placement="bottom-start">
                <FormSelect defaultValue={enemizer} onChange={e => onEnemizerValueChange(e)}>
                    <option value="0">None</option>
                    <option value="1">Limited</option>
                    <option value="2">Balanced</option>
                    <option value="3">Full</option>
                    <option value="4">Insane</option>
                </FormSelect>
            </Tooltip>
        </InputGroup>
    )
}

export default observer(EnemizerForm)
