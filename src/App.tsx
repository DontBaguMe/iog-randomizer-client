import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { BrowserRouter, Route } from 'react-router-dom'

import Navigation from './components/navigation'
import HomePage from './pages/home'
import PermalinkPage from './pages/permalink'
import versionService from './services/version'

function App() {
    useEffect(() => {
        async function getApiVersion() {
            await versionService.requestVersion()
        }

        getApiVersion()
    })

    return (
        <BrowserRouter>
            <Navigation />
            <>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/permalink/:id?" component={PermalinkPage} />
            </>
        </BrowserRouter>
    )
}

export default observer(App)
