import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Box } from '@material-ui/core'

import Navigation from './components/navigation'
import HomePage from './pages/home'
import versionService from './services/version'

function App() {
    useEffect(() => {
        async function getApiVersion() {
            await versionService.requestVersion()
        }

        getApiVersion()
    }, [])

    return (
        <Router>
            <Navigation />
            <Box>
                <Route exact path="/" component={HomePage} />
            </Box>
        </Router>
    )
}

export default observer(App)
