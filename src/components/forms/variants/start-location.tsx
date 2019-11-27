import React from 'react'
import { observer } from 'mobx-react'
import {
    FormSelect,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from 'shards-react'

import variantsStore from '../../../stores/variants'

@observer
export default class StartLocationForm extends React.Component {
    render() {
        return (
            <InputGroup>
                <InputGroupAddon type="prepend">
                    <InputGroupText>Starting Location</InputGroupText>
                </InputGroupAddon>
                <FormSelect
                    defaultValue={variantsStore.startLocation}
                    onChange={v =>
                        variantsStore.setStartLocation(parseInt(v.target.value))
                    }>
                    <option value="0">South Cape</option>
                    <option value="1">Safe</option>
                    <option value="2">Unsafe</option>
                    <option value="3">Forced Unsafe</option>
                </FormSelect>
            </InputGroup>
        )
    }
}
