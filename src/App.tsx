import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Box } from '@material-ui/core'

import Navigation from './components/navigation'
import HomePage from './pages/home'
import PermalinkPage from './pages/permalink'
import versionService from './services/version'

function App() {
    useEffect(() => {
        async function getApiVersion() {
            await versionService.requestVersion()
        }

    public render() {
        return (
            <Router>
                <Navigation />
                <>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/permalink/:id?" component={PermalinkPage} />
                </>
            </Router>
        )
    }
}

export default observer(App)
