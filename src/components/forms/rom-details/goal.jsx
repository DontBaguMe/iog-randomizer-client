import React from 'react'
import { observer } from 'mobx-react'
import { Grid } from '@material-ui/core'
import { FormSelect, InputGroup, InputGroupAddon, InputGroupText } from 'shards-react'

import detailsStore from '../../../stores/details'

const GoalForm = observer(
    class GoalForm extends React.Component {
        state = {
            showStatues: detailsStore.goal == 0
        }

        constructor(props) {
            super(props)

            this.updateGoal = this.updateGoal.bind(this)
        }

        updateGoal(g) {
            detailsStore.setGoal(g)
            
            this.setState({
                showStatues: g == 0
            })
        }

        render() {
            return (
                <Grid container spacing={1}>
                    <Grid item  xs={12}>
                        <InputGroup>
                            <InputGroupAddon type="prepend">
                                <InputGroupText>Goal</InputGroupText>
                            </InputGroupAddon>
                            <FormSelect defaultValue={detailsStore.goal} onChange={(v) => this.updateGoal(v.target.value)}>
                                <option value="0">Dark Gaia</option>
                                <option value="1">Red Jewel Hunt</option>
                            </FormSelect>
                        </InputGroup>
                    </Grid>

                    {this.state.showStatues && (
                        <Grid item xs={12}>
                            <InputGroup>
                                <InputGroupAddon type="prepend">
                                    <InputGroupText>Statues</InputGroupText>
                                </InputGroupAddon>
                                <FormSelect defaultValue={detailsStore.statues} onChange={(v) => detailsStore.setStatues(v.target.value)}>
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
)

export default GoalForm