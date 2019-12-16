import React, { Fragment } from 'react'
import { observer } from 'mobx-react'

import { Button } from 'shards-react'
import { Tooltip, FormControlLabel, Switch } from '@material-ui/core'

import detailsStore from '../../../stores/details'
import uiStore from '../../../stores/ui'
import romService from '../../../services/rom'
import seedService from '../../../services/seed'
import romStore from '../../../stores/rom'

const styles = {
    Switch: {
        marginLeft: 40,
    },
}

@observer
export default class GenerateForm extends React.Component {
    constructor(props) {
        super(props)

        this.handleGenerateRom = this.handleGenerateRom.bind(this)
    }

    async handleGenerateRom(e) {
        if (!this.validateFile(e)) return

        try {
            uiStore.setProcessing(true)

            await seedService.requestSeed()
            romService.removeHeader()
        } catch (error) {
            uiStore.setError(true, 'Whoops! Someone is burning my bacon!')

            console.error(error)
        } finally {
            uiStore.setProcessing(false)
        }
    }

    validateFile(e) {
        e.preventDefault()

        const hasBaseRom = romStore.hasBaseRom()
        if (!hasBaseRom) {
            uiStore.setError(true, 'Hey, man. You need to upload a ROM file.')
            return false
        }

        if (isNaN(detailsStore.seed)) {
            uiStore.setError(true, 'Hey, man. You need to enter a valid integer for a seed!')
            return false
        }

        if (detailsStore.seed < 0) {
            uiStore.setError(true, 'Hey, man. You need to enter a valid non-negative integer for a seed!')
            return false
        }

        return true
    }

    render() {
        const hasBaseRom = romStore.hasBaseRom()
        const isDisabled: boolean = uiStore.isProcessing || uiStore.isLoadingOriginalRom || !hasBaseRom
        const button = (
            <Button variant="contained" color="primary" disabled={isDisabled} onClick={this.handleGenerateRom}>
                Generate ROM
            </Button>
        )

        const raceRomToggle = (
            <FormControlLabel
                style={styles.Switch}
                control={
                    <Switch
                        checked={detailsStore.generateRaceRom}
                        onChange={e => detailsStore.setGenerateRaceRom(e.target.checked)}
                        disabled={isDisabled}
                        value="Generate Race Rom"
                    />
                }
                label="Generate Race Rom"
            />
        )

        if (isDisabled)
            return (
                <Fragment>
                    {button}
                    {raceRomToggle}
                </Fragment>
            )

        return (
            <Fragment>
                <Tooltip title="Generate Randomized ROM">{button}</Tooltip>
                <Tooltip title="Generate a Randomized ROM without spoilers" placement="bottom-start">
                    {raceRomToggle}
                </Tooltip>
            </Fragment>
        )
    }
}
