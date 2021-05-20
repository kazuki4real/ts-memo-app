import React from 'react'
import Signup from './Signup'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import styled from 'styled-components'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import IconButton from '@material-ui/core/IconButton'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import { sp } from './media'

const Paper = styled.div`
  margin: 100px 0 0;
  width: 70%;
  ${sp`
    margin: 50px 0 0;
    width: 90%;
  `}
`

const DarkMode = styled.div`
  display: flex;
  justify-content: flex-end;
`

const App: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(
    localStorage.getItem('darkMode') === 'on' ? true : false,
  )
  const handleDarkModeOn = () => {
    localStorage.setItem('darkMode', 'on')
    setDarkMode(true)
  }
  const handleDarkModeOff = () => {
    localStorage.setItem('darkMode', 'off')
    setDarkMode(false)
  }
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <DarkMode>
          <CssBaseline />
          {darkMode ? (
            <IconButton color="inherit" onClick={handleDarkModeOff}>
              <Brightness7Icon />
            </IconButton>
          ) : (
            <IconButton color="inherit" onClick={handleDarkModeOn}>
              <Brightness4Icon />
            </IconButton>
          )}
        </DarkMode>

        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </Paper>
    </ThemeProvider>
  )
}

export default App
