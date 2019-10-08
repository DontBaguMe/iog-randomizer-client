import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { observer } from 'mobx-react'

import Navigation from './components/navigation'
import HomePage from './pages/home'
import { Box } from '@material-ui/core'

const App = observer(
  class App extends React.Component {
    render() {
      return (
        <Router>
          <Navigation />
          <Box>
            <Route exact path="/" component={HomePage} />
          </Box>
        </Router>
      );
    }
  }
)

export default App