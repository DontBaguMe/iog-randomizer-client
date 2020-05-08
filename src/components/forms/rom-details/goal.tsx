import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Grid, Tooltip } from '@material-ui/core'
import { FormSelect, InputGroup, InputGroupAddon, InputGroupText } from 'shards-react'
import { settingsStore } from '../../../stores/settings'

function GoalForm() {
    const [goal, setGoal] = useState(settingsStore.goal)
    const [statues, setStatues] = useState(settingsStore.statues)
    const [showStatues, setShowStatues] = useState(settingsStore.goal !== 1)

    function onGoalChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = parseInt(event.target.value)

        setGoal(value)
        settingsStore.goal = value
    }

    function onStatuesChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = event.target.value

        setStatues(value.toString())
        settingsStore.statues = value.toString()
    }

    useEffect(() => {
        setShowStatues(goal !== 1)
    }, [goal])

    function getTooltipText(): string {
        switch (goal) {
            case 0:
                return 'Rescue Kara, gather required Mystic Statues (if any), and defeat Dark Gaia to win the game'
            case 1:
                return "Collect the Jeweler's Red Jewels to beat the game!"
            case 2:
                return "Same as Dark Gaia, except the final boss is replaced with the *true* final boss hidden in the game's code (very hard!)"
            case 3:
                return 'Same as Dark Gaia, though there is a 50/50 chance that the final boss might be Apocalypse Gaia instead'
        }

        throw new Error('How did you do this?')
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <InputGroup>
                    <InputGroupAddon type="prepend">
                        <InputGroupText>Goal</InputGroupText>
                    </InputGroupAddon>
                    <Tooltip title={getTooltipText()} placement="bottom-start">
                        <FormSelect defaultValue={goal} onChange={(e) => onGoalChange(e)} aria-label="Input for Seed Goal">
                            <option value="0">Dark Gaia</option>
                            <option value="1">Red Jewel Hunt</option>
                            <option value="2">Apocalypse Gaia</option>
                            <option value="3">Random Gaia</option>
                        </FormSelect>
                    </Tooltip>
                </InputGroup>
            </Grid>

            {showStatues && (
                <Grid item xs={12}>
                    <InputGroup>
                        <InputGroupAddon type="prepend">
                            <InputGroupText>Statues</InputGroupText>
                        </InputGroupAddon>
                        <FormSelect defaultValue={statues} onChange={(e) => onStatuesChange(e)} aria-label="Input for Seed Goal for Dark Gaia or Apocalypse Gaia">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="Random">Random</option>
                        </FormSelect>
                    </InputGroup>
                </Grid>
            )}
        </Grid>
    )
}

export default observer(GoalForm)
