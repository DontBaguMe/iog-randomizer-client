


import React from 'react'
import { observer } from 'mobx-react'
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
        state = {
            expanded: false
        }

        constructor(props) {
            super(props)

            this.isExpanded = this.isExpanded.bind(this)
            this.handlePanelChange = this.handlePanelChange.bind(this)
        }
        
        componentDidMount() {
            if (this.props.expanded)
                this.setState({expanded: this.props.expanded})
        }

        isExpanded() {
            return this.state.expanded
        }

        handlePanelChange(panel, e, expanded) {
            this.setState({expanded})
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