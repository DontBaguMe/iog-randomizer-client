import React from 'react'
import { observer } from 'mobx-react'

import { Button } from 'shards-react'
import { Tooltip, FormControlLabel, Switch } from '@material-ui/core'

import seedService from '../../../services/seed'
import romStore from '../../../stores/rom'
import { settingsStore } from '../../../stores/settings'
import uiStore from '../../../stores/ui'

const styles = {
    Switch: {
        marginLeft: 40,
    },
}

function GenerateForm() {
    function validateFile(): boolean {
        const exists = romStore.canGenerate
        if (!exists) {
            uiStore.setError(true, 'Hey, man. You need to upload a ROM file.')
            return false
        }

        const seed = settingsStore.seed
        if (isNaN(seed)) {
            uiStore.setError(true, 'Hey, man. You need to enter a valid integer for a seed!')
            return false
        }

        if (seed < 0) {
            uiStore.setError(true, 'Hey, man. You need to enter a valid non-negative integer for a seed!')
            return false
        }

        return true
    }

    async function onGenerateClick(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault()

        const valid = validateFile()
        if (!valid) return

        try {
            uiStore.setProcessing(true)
            await seedService.requestSeed()
        } catch (err) {
            uiStore.setError(true, 'Whoops! Someone is burning my bacon!')
            console.error(err)
        } finally {
            uiStore.setProcessing(false)
        }
    }

    function onRaceRomToggle(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.checked
        settingsStore.raceRom = value
    }

    const { isError, isProcessing } = uiStore
    const isDisabled = isError || isProcessing

    return (
        <>
            <Tooltip title="Generate Randomized ROM">
                <span>
                    <Button variant="contained" color="primary" disabled={isDisabled} onClick={(e) => onGenerateClick(e)}>
                        Generate ROM
                    </Button>
                </span>
            </Tooltip>
            <Tooltip title="Generate a Randomized ROM without spoilers" placement="bottom-start">
                <FormControlLabel
                    style={styles.Switch}
                    control={<Switch checked={settingsStore.raceRom} onChange={(e) => onRaceRomToggle(e)} disabled={isDisabled} value="Generate Race Rom" />}
                    label="Generate Race Rom"
                />
            </Tooltip>
        </>
    )
}

export default observer(GenerateForm)
