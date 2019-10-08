import React from 'react'
import { observer } from 'mobx-react'
import { InputGroup, InputGroupAddon, InputGroupText, FormSelect } from 'shards-react'

import detailsStore from '../../../stores/details'

const DifficultyForm = observer(
    class DifficultyForm extends React.Component {
        render() {
            return (
                <InputGroup>
                    <InputGroupAddon type="prepend">
                        <InputGroupText>Difficulty</InputGroupText>
                    </InputGroupAddon>
                    <FormSelect defaultValue={detailsStore.difficulty} onChange={(e) => detailsStore.setDifficulty(e.target.value)}>
                        <option value="0">Easy</option>
                        <option value="1">Normal</option>
                        <option value="2">Hard</option>
                        <option value="3">Extreme</option>
                    </FormSelect>
                </InputGroup>
            )
        }
    }
)

export default DifficultyForm