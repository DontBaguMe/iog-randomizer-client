import React from 'react'
import { observer } from 'mobx-react'
import { Grid, Tooltip } from '@material-ui/core'
import { FormSelect, InputGroup, InputGroupAddon, InputGroupText } from 'shards-react'

import detailsStore from '../../../stores/details'

interface State {
    showStatues: boolean
}

@observer
export default class GoalForm extends React.PureComponent<{}, State> {
    state: State = {
        showStatues: detailsStore.goal !== 1,
    }

    constructor(props) {
        super(props)

        this.updateGoal = this.updateGoal.bind(this)
    }

    private updateGoal(goal: number): void {
        detailsStore.setGoal(goal)

        this.setState({
            showStatues: goal !== 1,
        })
    }

    private getTooltipText(): string {
        switch (detailsStore.goal) {
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

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <InputGroup>
                        <InputGroupAddon type="prepend">
                            <InputGroupText>Goal</InputGroupText>
                        </InputGroupAddon>
                        <Tooltip title={this.getTooltipText()} placement="bottom-start">
                            <FormSelect defaultValue={detailsStore.goal} onChange={v => this.updateGoal(parseInt(v.target.value))}>
                                <option value="0">Dark Gaia</option>
                                <option value="1">Red Jewel Hunt</option>
                                <option value="2">Apocalypse Gaia</option>
                                <option value="3">Random Gaia</option>
                            </FormSelect>
                        </Tooltip>
                    </InputGroup>
                </Grid>

                {this.state.showStatues && (
                    <Grid item xs={12}>
                        <InputGroup>
                            <InputGroupAddon type="prepend">
                                <InputGroupText>Statues</InputGroupText>
                            </InputGroupAddon>
                            <FormSelect defaultValue={detailsStore.statues} onChange={v => detailsStore.setStatues(v.target.value)}>
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
}
