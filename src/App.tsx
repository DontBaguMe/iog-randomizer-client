import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { BrowserRouter, Route } from 'react-router-dom'

import Navigation from './components/navigation'
import HomePage from './pages/home'
import MysteryPage from './pages/mystery'
import PermalinkPage from './pages/permalink'
import versionService from './services/version'
import romStore from './stores/rom'
import uiStore from './stores/ui'
import loading from './assets/loading-note.webp'

const style = {
    loading: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
}

function App() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getApiVersion() {
            await versionService.requestVersion()
            setIsLoading(false)
        }

        getApiVersion()
    }, [])

    useEffect(() => {
        uiStore.clear()
        romStore.clearPatch()
    }, [])

    if (isLoading)
        return (
            <div style={style.loading as React.CSSProperties}>
                <img src={loading} alt="Loading" />
                <span>Checking to see if the API is running...</span>
            </div>
        )

    return (
        <BrowserRouter>
            <Navigation />
            <>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/mystery" component={MysteryPage} />
                <Route exact path="/permalink/:id?" component={PermalinkPage} />
            </>
        </BrowserRouter>
    )
}

export default observer(App)
