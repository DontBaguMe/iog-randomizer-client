import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { FormSelect, InputGroup, InputGroupAddon, InputGroupText } from 'shards-react'
import { customizerStore } from '../../../stores/customizer'
import { DarkSpace, DarkSpaceNames } from '../../../models/customizer/darkspaces'

function SetAbilityLocationForm(params) {
    const [abilities] = useState(() => customizerStore.Abilities)
    const [abilityLocation, setAbilityLocation] = useState(abilities[params.ability])

    function onOptionChange(event: React.ChangeEvent<HTMLInputElement>) {
        customizerStore.Abilities[params.ability] = event.target.value
    }
    if (abilityLocation != (abilities[params.ability])) setAbilityLocation(abilities[params.ability])

    const option_list = []
    console.log(DarkSpaceNames)
    for (var enumValue in DarkSpace) {
        if (isNaN(Number(enumValue))) {
            option_list.push(<option value={DarkSpace[enumValue]}>{DarkSpaceNames[DarkSpace[enumValue]]}</option>)
        }
    }

    return (
        <InputGroup>
            <InputGroupAddon type="prepend">
                <InputGroupText>{params.ability}</InputGroupText>
            </InputGroupAddon>
            <FormSelect value={abilityLocation} onChange={(e) => onOptionChange(e)} >
                {option_list}
            </FormSelect>
        </InputGroup>
    )
}

export default observer(SetAbilityLocationForm)
