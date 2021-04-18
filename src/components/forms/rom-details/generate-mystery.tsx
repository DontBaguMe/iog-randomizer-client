import React from 'react'
import { observer } from 'mobx-react'

import { Button } from 'shards-react'
import { Tooltip } from '@material-ui/core'

import seedService from '../../../services/seed'
import romStore from '../../../stores/rom'
import { settingsStore } from '../../../stores/settings'
import uiStore from '../../../stores/ui'

function GenerateMysteryForm() {
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
            await seedService.requestMysterySeed()
        } catch (err) {
            uiStore.setError(true, 'Whoops! Someone is burning my bacon!')
            console.error(err)
        } finally {
            uiStore.setProcessing(false)
        }
    }

    const { isError, isProcessing } = uiStore
    const isDisabled = isError || isProcessing

    return (
        <>
            <Tooltip title="Generate Mystery ROM">
                <span>
                    <Button variant="contained" color="primary" disabled={isDisabled} onClick={(e) => onGenerateClick(e)}>
                        Generate Mystery ROM
                    </Button>
                </span>
            </Tooltip>
        </>
    )
}

export default observer(GenerateMysteryForm)
