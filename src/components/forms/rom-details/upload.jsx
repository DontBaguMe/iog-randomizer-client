import React from 'react'
import { observer } from 'mobx-react'
import { InputGroup, InputGroupAddon, InputGroupText } from 'shards-react'

import detailsStore from '../../../stores/details'

const UploadForm = observer(
    class UploadForm extends React.Component {
        render() {
            return (
                <InputGroup>
                    <InputGroupAddon type="prepend">
                        <InputGroupText>Rom File (*.sfc)</InputGroupText>
                    </InputGroupAddon>
                    <input required className="form-control" type="file" onChange={v => detailsStore.setFile(v.target.files[0])} />
                </InputGroup>
            )
        }
    }
)

export default UploadForm