


import React from 'react'
import { observer } from 'mobx-react'

import seedGeneratorStore from '../../stores/generator'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = {
    Panel: {
        marginLeft: "40px",
        marginRight: "40px"
    }
}

const AccordionPanel = observer(
    class AccordionPanel extends React.Component {
        isExpanded(panel) {
            const { expandedPanels } = seedGeneratorStore

            return expandedPanels.includes(panel)
        }

        handlePanelChange(panel, e, expanded) {
            if (expanded)
                seedGeneratorStore.addPanel(panel)
            else
                seedGeneratorStore.removePanel(panel)
        }

        render() {
            return (
                <ExpansionPanel expanded={this.isExpanded(this.props.id)} onChange={(e, expanded) => this.handlePanelChange(this.props.id, e, expanded)} style={styles.Panel}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">{this.props.title}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {this.props.children}                        
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )
        }
    }
)

export default AccordionPanel