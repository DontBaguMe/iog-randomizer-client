import React from 'react'
import { observer } from 'mobx-react'
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = {
    Panel: {
        marginLeft: 40,
        marginRight: 40,
    },
}

interface State {
    expanded: boolean
}

interface Props {
    id: string
    title: string
    expanded: boolean
}

@observer
export default class AccordionPanel extends React.PureComponent<Props, State> {
    public constructor(props: Props) {
        super(props)

        this.state = {
            expanded: this.props.expanded,
        }

        this.handlePanelChange = this.handlePanelChange.bind(this)
    }

    public componentDidMount() {
        if (this.props.expanded)
            this.setState({ expanded: this.props.expanded })
    }

    handlePanelChange(panel, e, expanded) {
        this.setState({ expanded })
    }

    public render(): JSX.Element {
        const { expanded } = this.state

        return (
            <ExpansionPanel
                expanded={expanded}
                onChange={(e, expanded) =>
                    this.handlePanelChange(this.props.id, e, expanded)
                }
                style={styles.Panel}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">
                        {this.props.title}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {this.props.children}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}
