


import React from 'react'
import { observer } from 'mobx-react'

import { Button, Grid } from '@material-ui/core'
import { RomUploadForm, SeedForm, DifficultyForm, GoalForm } from '../forms'

import AccordionPanel from './accordion-panel'

import seedService from '../../services/seed-service'
import detailsStore from '../../stores/details'
import uiStore from '../../stores/ui'
import romService from '../../services/rom-service'

const RomDetailsContainer = observer(
    class RomDetailsContainer extends React.Component {
        async handleSubmit(event) {
            event.preventDefault()
            let file = detailsStore.file

            if (!file) {
                uiStore.setError(true, 'Hey, man. You need to upload a ROM file.')
                return
            }

            if (isNaN(detailsStore.seed)) {
                uiStore.setError(true, 'Hey, man. You need to enter a valid integer for a seed!')
                return
            }

            if (detailsStore.seed <= 0) {
                uiStore.setError(true, 'Hey, man. You need to enter a valid non-negative integer for a seed!')
                return
            }
            
            try {
                uiStore.setProcessing(true)
                romService.removeHeader()
                await seedService.requestSeed()                

                uiStore.setError(false)
                uiStore.setDownloading(true)
            }
            catch (error) {
                uiStore.setError(true, 'Whoops! Someone is burning my bacon!')

                console.log(error)
            }
            finally {
                uiStore.setProcessing(false)
            }
        }

        handleDownloadRom() {
            const { romUri, romName } = uiStore

            let a = document.createElement('a')
            document.body.appendChild(a)
            a.style = 'display: none'
            a.href = romUri
            a.download = romName
            a.click()
            a.remove()
        }

        handleDownloadSpoiler() {
            const { spoilerUri, spoilerName } = uiStore

            let a = document.createElement('a')
            document.body.appendChild(a)
            a.style = 'display: none'
            a.href = spoilerUri
            a.download = spoilerName
            a.click()
            a.remove()
        }

        render() {
            return (
                <AccordionPanel title="Rom Details" id="rom-details">
                    <Grid container spacing={2}>
                        <Grid item xs={6}><RomUploadForm /></Grid>
                        <Grid item xs={6}><SeedForm /></Grid>
                        <Grid item xs={6}><DifficultyForm /></Grid>
                        <Grid item xs={6}><GoalForm /></Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" onClick={this.handleSubmit}>Generate ROM</Button>
                        </Grid>
                        {uiStore.hasDownload && (
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" onClick={this.handleDownloadRom} style={{ marginRight: 10 }}>Download Randomized ROM</Button>
                                <Button variant="contained" color="primary" onClick={this.handleDownloadSpoiler} >Download Spoiler Log</Button>
                            </Grid>
                        )}
                    </Grid>
                </AccordionPanel>
            )
        }
    }
)

export default RomDetailsContainer