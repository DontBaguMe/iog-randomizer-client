import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { BrowserRouter, Route } from 'react-router-dom'

import Navigation from './components/navigation'
import HomePage from './pages/home'
import PermalinkPage from './pages/permalink'
import versionService from './services/version'
import romStore from './stores/rom'
import uiStore from './stores/ui'

function App() {
    useEffect(() => {
        async function getApiVersion() {
            await versionService.requestVersion()
        }

        getApiVersion()
    }, [])

    useEffect(() => {
        uiStore.clear()
        romStore.clearPatch()
    }, [])

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
