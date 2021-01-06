import React, { useState } from 'react'
import { Spoiler } from '../../../models/rom/spoiler'
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'shards-react'
import uiService from '../../../services/ui'

interface Props {
    spoilerFilename: string
    spoilerData: Spoiler
}

export default function DownloadSpoilerButton(props: Props) {
    const [open, setOpen] = useState(false)

    function onDownloadSpoilerJsonClick(event: React.ChangeEvent<HTMLButtonElement>) {
        event.preventDefault()

        const filename = props.spoilerFilename.substring(0, props.spoilerFilename.lastIndexOf('.'))
        const blob = uiService.createSpoilerJsonBlob(props.spoilerData)
        uiService.downloadBlob(blob, filename + '.json')
    }

    function onDownloadSpoilerCsvClick(event: React.ChangeEvent<HTMLButtonElement>) {
        event.preventDefault()

        const filename = props.spoilerFilename.substring(0, props.spoilerFilename.lastIndexOf('.'))
        const blob = uiService.createSpoilerCsvBlob(props.spoilerData)
        uiService.downloadBlob(blob, filename + '.csv')
    }

    function onDownloadSpoilerTextClick(event: React.ChangeEvent<HTMLButtonElement>) {
        event.preventDefault()

        const blob = uiService.createSpoilerTextBlob(props.spoilerData)
        const filename = props.spoilerFilename.substring(0, props.spoilerFilename.lastIndexOf('.'))
        uiService.downloadBlob(blob, filename + '.txt')
    }

    function toggleDropdown() {
        setOpen(!open)
    }

    return <Dropdown open={open} toggle={toggleDropdown} group>
        <Button onClick={toggleDropdown}>Download Spoiler</Button>
        <DropdownToggle split />
        <DropdownMenu>
            <DropdownItem onClick={onDownloadSpoilerJsonClick}>Download as JSON</DropdownItem>
            <DropdownItem onClick={onDownloadSpoilerCsvClick}>Download as CSV</DropdownItem>
            <DropdownItem onClick={onDownloadSpoilerTextClick}>Download as Text</DropdownItem>
        </DropdownMenu>
    </Dropdown>
}
