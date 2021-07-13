import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { FormGroup, FormControlLabel, Switch, Tooltip } from '@material-ui/core'
import { settingsStore } from '../../../stores/settings'

function HideSettingsForm() {
    const [hideSettings, setHideSettings] = useState(settingsStore.hide_settings)

    function onHideSettingsToggle(event: React.ChangeEvent<HTMLInputElement>) {
        setHideSettings(event.target.checked)
        settingsStore.hide_settings = event.target.checked
    }

    return (
        <FormGroup>
            <Tooltip title="Hides the selected settings" placement="bottom-start">
                <FormControlLabel control={<Switch checked={hideSettings} onChange={e => onHideSettingsToggle(e)} value="Hide Settings" />} label="Hide Settings" />
            </Tooltip>
        </FormGroup>
    )
}

export default observer(HideSettingsForm)
