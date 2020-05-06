import React from 'react'
import { Spoiler } from '../../../models/rom/spoiler'
import { Button } from 'shards-react'
import uiService from '../../../services/ui'

interface Props {
    spoilerFilename: string
    spoilerData: Spoiler
}

export default function DownloadSpoilerButton(props: Props) {
    async function onDownloadSpoilerClick(event: React.ChangeEvent<HTMLButtonElement>) {
        event.preventDefault()

        const blob = uiService.createSpoilerBlob(props.spoilerData)
        uiService.downloadBlob(blob, props.spoilerFilename)
    }

    return (
        <Button color="primary" onClick={onDownloadSpoilerClick}>
            Download Spoiler
        </Button>
    )
}
