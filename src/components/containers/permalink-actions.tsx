import React from 'react'
import { Grid } from '@material-ui/core'
import DownloadForm from '../forms/rom-details/download'
import { RomUploadForm } from '../forms'
import { PermalinkedRom } from '../../models/rom/permalinked-rom'

interface Props {
    rom: PermalinkedRom
}

export default function PermalinkActionsContainer(props: Props) {
    return (
        <div style={{ padding: 5 }}>
            <Grid container>
                <Grid item xs={6}>
                    <RomUploadForm />
                </Grid>
                <Grid item xs={6}>
                    <DownloadForm patch={props.rom.patch} />
                </Grid>
            </Grid>
        </div>
    )
}
