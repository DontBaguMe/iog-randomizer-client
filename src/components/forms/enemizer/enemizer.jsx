import React from 'react'
import { observer } from 'mobx-react'
import { InputGroup, InputGroupAddon, InputGroupText, FormSelect } from 'shards-react'

import enemizerStore from '../../../stores/enemizer'
import { Tooltip } from '@material-ui/core'

const EnemizerForm = observer(
    class EnemizerForm extends React.Component {
        render() {
            return (
                <InputGroup>
                    <InputGroupAddon type="prepend">
                        <InputGroupText>Enemizer (Beta)</InputGroupText>
                    </InputGroupAddon>
                    <Tooltip title="Enemizer is currently in beta" placement="bottom-start">
                        <FormSelect defaultValue={enemizerStore.enemizer} onChange={(v) => enemizerStore.setEnemizer(v.target.value)}>
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
    }
)

export default EnemizerForm