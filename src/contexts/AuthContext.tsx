import React, { useContext, useState, useEffect, ReactNode } from 'react'
import { auth } from '../firebase'
import firebase from 'firebase/app'

const AuthContext = React.createContext<any>(null)

export const useAuth = () => {
  return useContext(AuthContext)
}

type AuthProps = {
  children?: React.ReactNode
}

export const AuthProvider: React.FC<AuthProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const signup = (
    email: string,
    password: string,
  ): Promise<firebase.auth.UserCredential> => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  const login = (
    email: string,
    password: string,
  ): Promise<firebase.auth.UserCredential> => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const logout = (): Promise<void> => {
    return auth.signOut()
  }

  const resetPassword = (email: string): Promise<void> => {
    return auth.sendPasswordResetEmail(email)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
