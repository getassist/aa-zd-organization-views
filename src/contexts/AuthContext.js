import React, { useState, useEffect, createContext } from 'react'
import { IContext } from '../providers/Interfaces'
import Database from '../providers/Database'
import { auth } from '../providers/Firebase'
import { signOut, signInAnonymously } from 'firebase/auth'
import Client from '../providers/Client'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  const getCurrentUser = async () => {
    const context = await Client.context()
    const subdomain = context.account.subdomain

    const {id} = await Client.get('currentUser')

    const conditions = [
      {
        field: 'subdomain',
        operator: '==',
        value: subdomain,
      },
      {
        field: 'zendeskId',
        operator: '==',
        value: id + '',
      }
    ]

    const userResults = await Database.query('users', conditions)
    if (userResults[0]) return userResults[0]
    return null
  }

  const anonymousSignIn = async () => {
    return signInAnonymously(auth)
      .then((response) => response.user)
  }

  const logOut = async () => {
    return signOut(auth)
  }

  const handleAuthState = async (authUser) => {
    if (!authUser) anonymousSignIn()

    const user = await getCurrentUser()
    if (user) setCurrentUser(user)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(handleAuthState)
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{
      currentUser,
      setCurrentUser,
      logOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = IContext
