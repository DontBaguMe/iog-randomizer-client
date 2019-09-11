


import React from 'react'
import { observer } from 'mobx-react'
import { StartLocationForm, GameLogicForm } from '../forms'

import AccordionPanel from './accordion-panel'
import { Grid } from '@material-ui/core';
import VariationTogglesForm from '../forms/variants/toggles';

const VariantsContainer = observer(
    class VariantsContainer extends React.Component {
        render() {
            return (
                <AccordionPanel title="Variants" id="variants">
                    <Grid container spacing={2}>
                        <Grid item xs={6}><StartLocationForm /></Grid>
                        <Grid item xs={6}><GameLogicForm /></Grid>
                        <Grid item xs={12}><VariationTogglesForm /></Grid>
                    </Grid>
                </AccordionPanel>
            )
        }
    }
)

export default VariantsContainer