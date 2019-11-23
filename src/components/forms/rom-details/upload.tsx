import React from 'react'
import { observer } from 'mobx-react'
import { InputGroup, InputGroupAddon, InputGroupText } from 'shards-react'

import { Tooltip } from '@material-ui/core'
import romStore from '../../../stores/rom'

@observer
export default class UploadForm extends React.Component {
    private onFileChange(e) {
        const reader = new FileReader()
        reader.onload = f => {
            romStore.setOriginalFile(f.target.result)
        }

        reader.readAsArrayBuffer(e)
    }

    public render() {
        return (
            <InputGroup>
                <InputGroupAddon type="prepend">
                    <InputGroupText>Rom File</InputGroupText>
                </InputGroupAddon>
                <Tooltip
                    title="Select a ROM file. Valid extensions are: SFC (non-headered) and SMC (headered)."
                    placement="bottom-start">
                    <input
                        required
                        className="form-control"
                        type="file"
                        onChange={v => this.onFileChange(v.target.files[0])}
                        accept=".sfc, .smc"
                    />
                </Tooltip>
            </InputGroup>
        )
    }
}
