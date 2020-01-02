import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { observer } from 'mobx-react'

import Navigation from './components/navigation'
import HomePage from './pages/home'
import PermalinkPage from './pages/permalink'
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
                <>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/permalink/:id?" component={PermalinkPage} />
                </>
            </Router>
        )
    }
}
