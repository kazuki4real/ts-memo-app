import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface Props {
  exact: boolean
  path: string
  component: any
}

const PrivateRoute = ({ component: Dashboard, ...rest }: Props) => {
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
