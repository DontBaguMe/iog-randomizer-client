import React from 'react'
import { observer } from 'mobx-react'
import Patch from '../../../models/rom/patch'
import DownloadSpoilerButton from '../../actions/buttons/download-spoiler'
import DownloadRomButton from '../../actions/buttons/download-rom'
import CopyPermalinkButton from '../../actions/buttons/copy-permalink'

const style = {
    container: {
        display: 'flex',
    },
    button: {
        paddingLeft: 10,
    },
}

interface Props {
    patch: Patch
    displayPermalink?: boolean
}

function DownloadForm(props: Props) {
    return (
        <div style={style.container}>
            <div style={style.button}>
                <DownloadRomButton patchData={props.patch.patchData} patchFilename={props.patch.patchFilename} />
            </div>

            {props.patch.spoilerData && (
                <div style={style.button}>
                    <DownloadSpoilerButton spoilerData={props.patch.spoilerData} spoilerFilename={props.patch.spoilerFilename} />
                </div>
            )}

            {props.displayPermalink && (
                <div style={style.button}>
                    <CopyPermalinkButton permalinkId={props.patch.permalinkId} />
                </div>
            )}
        </div>
    )
}

export default observer(DownloadForm)
