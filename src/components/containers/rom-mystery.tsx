import React from 'react'
import { observer } from 'mobx-react'

import { Grid } from '@material-ui/core'
import { RomUploadForm, MysteryUploadForm, HideSettingsForm } from '../forms'

import AccordionPanel from './accordion-panel'

import GenerateMysteryForm from '../forms/rom-details/generate-mystery'
import DownloadForm from '../forms/rom-details/download'
import romStore from '../../stores/rom'

const styles = {
    Container: {
        display: 'flex',
    },
}

function RomMysteryContainer() {
    return (
        <AccordionPanel title="Rom Details" id="rom-details" expanded={true}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <RomUploadForm />
                </Grid>
                <Grid item xs={6}>
                    <MysteryUploadForm />
                </Grid>
                <Grid item xs={6} style={styles.Container}>
                    <GenerateMysteryForm />
                </Grid>
                <Grid item xs={6}>
                    <HideSettingsForm />
                </Grid>
                {romStore.patch && (
                    <Grid item xs={12}>
                        <DownloadForm patch={romStore.patch} displayPermalink={true} fluteless={romStore.patch.fluteless} />
                    </Grid>
                )}
            </Grid>
        </AccordionPanel>
    )
}

export default observer(RomMysteryContainer)
