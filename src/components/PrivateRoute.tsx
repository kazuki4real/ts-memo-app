import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// interface IProps {
//   component: any
//   // any other props that come into the component
// }

const PrivateRoute = ({ component: Dashboard, ...rest }: any) => {
  console.log({ ...rest, Dashboard })

  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Dashboard {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}

export default PrivateRoute
