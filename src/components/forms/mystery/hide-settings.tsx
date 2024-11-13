import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { FormGroup, FormControlLabel, Switch, Tooltip } from '@material-ui/core'
import { settingsStore } from '../../../stores/settings'

function HideSettingsForm() {
    const [hideSettings, setHideSettings] = useState(settingsStore.hide_settings)
    const [returnSpoiler, setReturnSpoiler] = useState(settingsStore.returnSpoiler)

    function onHideSettingsToggle(event: React.ChangeEvent<HTMLInputElement>) {
        setHideSettings(event.target.checked)
        settingsStore.hide_settings = event.target.checked
    }
    function onReturnSpoilerToggle(event: React.ChangeEvent<HTMLInputElement>) {
        setReturnSpoiler(event.target.checked)
        settingsStore.returnSpoiler = event.target.checked
    }

    return (
        <FormGroup>
            <Tooltip title="Hides the selected settings" placement="bottom-start">
                <FormControlLabel control={<Switch checked={hideSettings} onChange={e => onHideSettingsToggle(e)} value="Hide Settings" />} label="Hide Settings" />
            </Tooltip>
            <Tooltip title="Allow download of the spoiler instantly after generation" placement="bottom-start">
                <FormControlLabel control={<Switch checked={returnSpoiler} onChange={e => onReturnSpoilerToggle(e)} value="Show spoiler after generation" />} label="Show spoiler after generation" />
            </Tooltip>
        </FormGroup>
    )
}

export default observer(HideSettingsForm)
