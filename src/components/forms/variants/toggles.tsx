import React from 'react'
import { observer } from 'mobx-react'
import { FormGroup, Tooltip, FormControlLabel, Switch } from '@material-ui/core'
import { settingsStore } from '../../../stores/settings'

function VariationTogglesForm() {
    function onOpenWorldToggle(event: React.ChangeEvent<HTMLInputElement>) {
        settingsStore.openWorld = event.target.checked
    }
    function onZ3ModeToggle(event: React.ChangeEvent<HTMLInputElement>) {
        settingsStore.z3mode = event.target.checked
    }
    function onAllowGlitchesToggle(event: React.ChangeEvent<HTMLInputElement>) {
        settingsStore.allowGlitches = event.target.checked
    }
    function onOneHitKnockOutToggle(event: React.ChangeEvent<HTMLInputElement>) {
        settingsStore.oneHitKnockOut = event.target.checked
        settingsStore.redJewelMadness = false
    }
    function onRedJewelMadnessToggle(event: React.ChangeEvent<HTMLInputElement>) {
        settingsStore.redJewelMadness = event.target.checked
        settingsStore.oneHitKnockOut = false
    }
    function onFirebirdToggle(event: React.ChangeEvent<HTMLInputElement>) {
        settingsStore.firebird = event.target.checked
    }
    function onFlutelessToggle(event: React.ChangeEvent<HTMLInputElement>) {
        settingsStore.fluteless = event.target.checked
    }

    return (
        <FormGroup row>
            <Tooltip title="Entire world is opened at the start of the game" placement="bottom-start">
                <FormControlLabel control={<Switch checked={settingsStore.openWorld} onChange={(e) => onOpenWorldToggle(e)} value="Open World" />} label="Open World" />
            </Tooltip>

            <Tooltip
                title={
                    <>
                        <span>The game has been redesigned to mirror the combat and health upgrade systems in "The Legend of Zelda: A Link to the Past".</span>
                        <br />
                        <br />
                        <span>For instance, STR and DEF double in strength with each upgrade, and Heart Pieces have been added to the item pool.</span>
                    </>
                }
                placement="bottom-start">
                <FormControlLabel control={<Switch checked={settingsStore.z3mode} onChange={(e) => onZ3ModeToggle(e)} value="Zelda 3 Mode" />} label="Zelda 3 Mode" />
            </Tooltip>

            <Tooltip title="Enables the logic to require known glitches to complete the seed" placement="bottom-start">
                <FormControlLabel
                    control={<Switch checked={settingsStore.allowGlitches} onChange={(e) => onAllowGlitchesToggle(e)} value="Allow Glitches" />}
                    label="Allow Glitches"
                />
            </Tooltip>

            <Tooltip title="It only takes one hit to be defeated!" placement="bottom-start">
                <FormControlLabel control={<Switch checked={settingsStore.oneHitKnockOut} onChange={(e) => onOneHitKnockOutToggle(e)} value="OHKO" />} label="OHKO" />
            </Tooltip>

            <Tooltip title="The player starts at 40 HP and loses 1 HP with every Red Jewel used" placement="bottom-start">
                <FormControlLabel
                    control={<Switch checked={settingsStore.redJewelMadness} onChange={(e) => onRedJewelMadnessToggle(e)} value="Red Jewel Madness" />}
                    label="Red Jewel Madness"
                />
            </Tooltip>

            <Tooltip title="Enables the logic to grant firebird much earlier in the game" placement="bottom-start">
                <FormControlLabel control={<Switch checked={settingsStore.firebird} onChange={(e) => onFirebirdToggle(e)} value="Firebird" />} label="Early Firebird" />
            </Tooltip>

            <Tooltip title="Remove Will's flute from the game" placement="bottom-start">
                <FormControlLabel control={<Switch checked={settingsStore.fluteless} onChange={(e) => onFlutelessToggle(e)} value="Fluteless" />} label="Fluteless" />
            </Tooltip>
        </FormGroup>
    )
}

export default observer(VariationTogglesForm)
