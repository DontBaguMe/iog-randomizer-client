import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { InputGroup, InputGroupAddon, InputGroupText, FormInput, Button } from 'shards-react'

import { Tooltip } from '@material-ui/core'
import romStore from '../../../stores/rom'

function UploadForm() {
    const [hasRom, setHasRom] = useState(romStore.rom.exists())

    useEffect(() => {
        async function init() {
            await romStore.init()
            const exists = romStore.rom.exists()
            setHasRom(exists)
        }

        init()
    }, [])

    function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const reader = new FileReader()
        reader.onload = (f: ProgressEvent<FileReader>) => {
            const buffer: ArrayBuffer = f.target.result as ArrayBuffer
            romStore.rom.set(buffer)
            setHasRom(true)
        }

        reader.readAsArrayBuffer(event.target.files[0])
    }

    async function onResetRomFileClick(): Promise<void> {
        await romStore?.rom.clear()
        setHasRom(false)
    }

    let element: JSX.Element = hasRom ? (
        <>
            <FormInput placeholder="- Cached -" disabled={true} />
            <InputGroupAddon key="1" type="append">
                <Button theme="primary" onClick={onResetRomFileClick}>
                    Reset ROM File
                </Button>
            </InputGroupAddon>
        </>
    ) : (
        <Tooltip key="0" title="Select a ROM file. Valid extensions are: SFC (non-headered) and SMC (headered)." placement="bottom-start">
            <input required className="form-control" id="rom-file" type="file" onChange={(e) => onFileChange(e)} accept=".sfc, .smc" />
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

export default observer(UploadForm)
