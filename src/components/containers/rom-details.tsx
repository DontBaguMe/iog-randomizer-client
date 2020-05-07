import React from 'react'
import { observer } from 'mobx-react'

import { Grid } from '@material-ui/core'
import { RomUploadForm, SeedForm, DifficultyForm, GoalForm } from '../forms'

import AccordionPanel from './accordion-panel'

import GenerateForm from '../forms/rom-details/generate'
import DownloadForm from '../forms/rom-details/download'
import { romStore } from '../../stores/rom'

const styles = {
    Container: {
        display: 'flex',
    },
}

function RomDetailsContainer() {
    return (
        <AccordionPanel title="Rom Details" id="rom-details" expanded={true}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <RomUploadForm />
                </Grid>
                <Grid item xs={6}>
                    <SeedForm />
                </Grid>
                <Grid item xs={6}>
                    <DifficultyForm />
                </Grid>
                <Grid item xs={6}>
                    <GoalForm />
                </Grid>
                <Grid item xs={12} style={styles.Container}>
                    <GenerateForm />
                </Grid>
                {romStore.patch && (
                    <Grid item xs={12}>
                        <DownloadForm patch={romStore.patch} displayPermalink={true} />
                    </Grid>
                )}
            </Grid>
        </AccordionPanel>
    )
}

export default observer(RomDetailsContainer)
