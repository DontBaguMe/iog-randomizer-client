import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { FormInput, InputGroup, InputGroupAddon, InputGroupText } from 'shards-react'
import { mysteryStore } from '../../../stores/mystery'

function SetWeightForm(params) {
    const [weekly] = useState(() => mysteryStore.Weights.Weekly)
    const [option_weight, setOptionWeight] = useState(weekly[params.property][params.category])

    function onOptionChange(event: React.ChangeEvent<HTMLInputElement>) {
        mysteryStore.Weights.Weekly[params.property][params.category] = event.target.value
    }
    if (option_weight != weekly[params.property][params.category]) setOptionWeight(weekly[params.property][params.category])

    return (
        <InputGroup>
            <InputGroupAddon type="prepend">
                <InputGroupText>{params.category}</InputGroupText>
            </InputGroupAddon>
            <FormInput value={option_weight} onChange={(e) => onOptionChange(e)} type="number" min={0} />
        </InputGroup>
    )
}

export default observer(SetWeightForm)
