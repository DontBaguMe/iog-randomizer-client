import React, { useState } from 'react'
import { Button } from 'shards-react'
import { FaCopy } from 'react-icons/fa'
import uiService from '../../../services/ui'
import { Snackbar } from '@material-ui/core'

interface Props {
    permalinkId: string
}

export default function CopyPermalinkButton(props: Props) {
    const [toastOpen, setToastOpen] = useState(false)

    function onCopyPermalink(event: React.ChangeEvent<HTMLButtonElement>) {
        event.preventDefault()

        const currentUrl = new URL(document.location.href)
        const permalinkUrl = `${currentUrl.protocol}//${currentUrl.hostname}${currentUrl.port ? `:${currentUrl.port}` : ''}/permalink/${props.permalinkId}`

        uiService.copyToClipboard(permalinkUrl)
        setToastOpen(true)
    }

    if (!document.queryCommandEnabled('copy')) return <></>

    return (
        <>
            <Button color="secondary" onClick={onCopyPermalink}>
                <FaCopy></FaCopy> Copy Permalink
            </Button>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={toastOpen}
                autoHideDuration={3000}
                onClose={(e, r) => setToastOpen(false)}
                message="Permalink Copied!"></Snackbar>
        </>
    )
}
