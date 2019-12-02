import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { observer } from 'mobx-react'

import Navigation from './components/navigation'
import HomePage from './pages/home'
import { Box } from '@material-ui/core'
import versionService from './services/version'

@observer
export default class App extends React.Component {
    public async componentDidMount(): Promise<void> {
        await versionService.requestVersion()
    }

    public render() {
        return (
            <Router>
                <Navigation />
                <Box>
                    <Route exact path="/" component={HomePage} />
                </Box>
            </Router>
        )
    }
}
