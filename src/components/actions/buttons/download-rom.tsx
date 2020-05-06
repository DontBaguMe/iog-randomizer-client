import React from 'react'
import { Button } from 'shards-react'
import uiService from '../../../services/ui'
import RomPatchStep from '../../../models/rom/patch-step'
import uiStore from '../../../stores/ui'

interface Props {
    patchData: RomPatchStep[]
    patchFilename: string
}

export default function DownloadRomButton(props: Props) {
    async function onDownloadRomClick(event: React.ChangeEvent<HTMLButtonElement>) {
        event.preventDefault()

        const blob = await uiService.createRomBlobAsync(props.patchData)
        if (!blob) {
            uiStore.setError(true, 'Hey man, you need to load a ROM first.')
            return
        }
        uiService.downloadBlob(blob, props.patchFilename)
    }

    return (
        <Button color="primary" onClick={onDownloadRomClick}>
            Download ROM
        </Button>
    )
}
