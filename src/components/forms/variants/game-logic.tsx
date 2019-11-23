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
export default class GameLogicForm extends React.Component {
    render() {
        return (
            <InputGroup>
                <InputGroupAddon type="prepend">
                    <InputGroupText>Logic</InputGroupText>
                </InputGroupAddon>
                <FormSelect
                    defaultValue={variantsStore.logic}
                    onChange={v =>
                        variantsStore.setLogic(parseInt(v.target.value))
                    }>
                    <option value="0">Completable</option>
                    <option value="1">Beatable</option>
                    <option value="2">Chaos</option>
                </FormSelect>
            </InputGroup>
        )
    }
}
