import error from '../../assets/error.gif'

import React from 'react'
import { observer } from 'mobx-react'
import { Grid, Typography, Paper } from '@material-ui/core'

const Style = {
    Container: {
        maxWidth: 500,
        padding: 20,
    },
}

type Props = {
    message: string
}

@observer
export default class Error extends React.Component<Props> {
    render() {
        return (
            <Paper style={Style.Container}>
                <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    justify="center"
                    direction="column">
                    <Grid item>
                        <Typography variant="h3">Whoops!</Typography>
                    </Grid>
                    <Grid item>
                        <img src={error} alt="Error" />
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            {this.props.message}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}
