import React from 'react'
import { observer } from 'mobx-react'
import { InputGroup, InputGroupAddon, InputGroupText } from 'shards-react'

import detailsStore from '../../../stores/details'
import { Tooltip } from '@material-ui/core'

const UploadForm = observer(
    class UploadForm extends React.Component {
        render() {
            return (                
                <InputGroup>
                    <InputGroupAddon type="prepend">
                        <InputGroupText>Rom File</InputGroupText>
                    </InputGroupAddon>
                    <Tooltip title="Select a ROM file. Valid extensions are: SFC (non-headered) and SMC (headered)." placement="bottom-start">
                        <input required className="form-control" type="file" onChange={v => detailsStore.setFile(v.target.files[0])} accept=".sfc, .smc" />
                    </Tooltip>
                </InputGroup>
            )
        }
    }
)

export default UploadForm