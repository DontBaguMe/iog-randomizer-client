import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { FormInput, InputGroup, InputGroupAddon, InputGroupText } from 'shards-react'
import { mysteryStore } from '../../../stores/mystery'

function SetWeightForm(params) {
    const [option_weight, setOptionWeight] = useState(mysteryStore.weights[params.property][params.category])

    function onOptionChange(event: React.ChangeEvent<HTMLInputElement>) {
        setOptionWeight(event.target.value)
        mysteryStore.weights[params.property][params.category] = event.target.value
    }

    return (
        <InputGroup>
            <InputGroupAddon type="prepend">
                <InputGroupText>{params.category}</InputGroupText>
            </InputGroupAddon>
            <FormInput value={option_weight} onChange={e => onOptionChange(e)} type="number" min={0} />
        </InputGroup>
    )
}

export default observer(SetWeightForm)
