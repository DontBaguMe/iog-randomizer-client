import React from 'react'
import { observer } from 'mobx-react'
import { FormGroup, Tooltip, FormControlLabel, Switch } from '@material-ui/core'

import variantsStore from '../../../stores/variants'

@observer
export default class VariationTogglesForm extends React.Component {
    render() {
        return (
            <FormGroup row>
                <Tooltip
                    title="Enables the logic to require known glitches to complete the seed"
                    placement="bottom-start">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={variantsStore.allowGlitches}
                                onChange={e =>
                                    variantsStore.setAllowGlitches(
                                        e.target.checked,
                                    )
                                }
                                value="Allow Glitches"
                            />
                        }
                        label="Allow Glitches"
                    />
                </Tooltip>

                <Tooltip
                    title="It only takes one hit to be defeated!"
                    placement="bottom-start">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={variantsStore.oneHitKnockOut}
                                onChange={e =>
                                    variantsStore.setOneHitKnockOut(
                                        e.target.checked,
                                    )
                                }
                                value="OHKO"
                            />
                        }
                        label="OHKO"
                    />
                </Tooltip>

                <Tooltip
                    title="The player starts at 40 HP and loses 1 HP with every Red Jewel used"
                    placement="bottom-start">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={variantsStore.redJewelMadness}
                                onChange={e =>
                                    variantsStore.setRedJewelMadness(
                                        e.target.checked,
                                    )
                                }
                                value="Red Jewel Madness"
                            />
                        }
                        label="Red Jewel Madness"
                    />
                </Tooltip>

                <Tooltip
                    title="Enables the logic to grant firebird much earlier in the game"
                    placement="bottom-start">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={variantsStore.firebird}
                                onChange={e =>
                                    variantsStore.setFirebird(e.target.checked)
                                }
                                value="Firebird"
                            />
                        }
                        label="Early Firebird"
                    />
                </Tooltip>
            </FormGroup>
        )
    }
}
