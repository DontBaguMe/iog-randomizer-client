import React, { Fragment } from 'react'
import { observer } from 'mobx-react'
import { InputGroup, InputGroupAddon, InputGroupText, FormInput, Button } from 'shards-react'

import { Tooltip } from '@material-ui/core'
import romStore from '../../../stores/rom'
import uiStore from '../../../stores/ui'

@observer
export default class UploadForm extends React.Component {
    private onFileChange(e) {
        uiStore.setLoadingOriginalRom(true)

        const reader = new FileReader()
        reader.onload = (f: ProgressEvent<FileReader>) => {
            const buffer: ArrayBuffer = f.target.result as ArrayBuffer

            romStore.setOriginalFile(buffer)
            uiStore.setLoadingOriginalRom(false)
        }

        reader.readAsArrayBuffer(e)
    }

    private async resetRomFile(): Promise<void> {
        await romStore.clearRom()
    }

    public async componentDidMount(): Promise<void> {
        uiStore.setLoadingOriginalRom(true)
        await romStore.loadRomFromStorage()
        uiStore.setLoadingOriginalRom(false)
    }

    public render(): JSX.Element {
        const hasBaseRom = romStore.hasBaseRom()

        let element: JSX.Element = hasBaseRom ? (
            <Fragment>
                <FormInput placeholder="- Cached -" disabled={true} />
                <InputGroupAddon key="1" type="append">
                    <Button theme="primary" onClick={this.resetRomFile}>
                        Reset ROM File
                    </Button>
                </InputGroupAddon>
            </Fragment>
        ) : (
            <Tooltip key="0" title="Select a ROM file. Valid extensions are: SFC (non-headered) and SMC (headered)." placement="bottom-start">
                <input required className="form-control" id="rom-file" type="file" onChange={v => this.onFileChange(v.target.files[0])} accept=".sfc, .smc" />
            </Tooltip>
        )

        return (
            <InputGroup>
                <InputGroupAddon type="prepend">
                    <InputGroupText>Rom File</InputGroupText>
                </InputGroupAddon>
                {element}
            </InputGroup>
        )
    }
}
