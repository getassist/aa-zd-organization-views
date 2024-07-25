import React, { createContext, useContext, useEffect, useState } from 'react'
import Database from '../providers/Database'
import { useNavigate } from 'react-router-dom'
import { isFirstInArray } from '../providers/Helpers'
import { IContext } from '../providers/Interfaces'
import { AuthContext } from './AuthContext'
import useNotifications from '../hooks/useNotifications'
import { useCollection } from 'react-firebase-hooks/firestore'

export const ViewsContext = createContext({})

export const ViewsContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const {notify} = useNotifications()
  const {currentUser} = useContext(AuthContext)
  const [views, setViews] = useState([])  
  const [store, setStore] = useState()
  const [loading, setLoading] = useState(true)

  const addView = async (view) => {
    const newView = await Database.add(store, {...view, userCreated: currentUser.id})

    notify('View has been added.', 'success', 'Success')
    return selectView(newView)
  }

  const updateView = async (view) => {
    await Database.update(store, {...view, userUpdated: currentUser.id})

    notify('View has been updated.', 'success', 'Success')
    return selectView(view)
  }

  const selectView = (view) => {
    return navigate(`/display/${view.id}`)
  }

  const deleteView = async (view) => {
    await Database.delete(store, view.id)

    notify('View has been deleted.', 'warning', 'Deleted')
    if (isFirstInArray(views, view, 'id')) return selectView(views[1])
    return selectView(views[0])
  }

  const filterPersonalViews = (data) => {
    return data.map((view) => {
      if (view.type.value === 'personal') {
        if (view.userCreated === currentUser.id) return view
        else return null
      }
      return view
    })
  }

  useEffect(() => {
    const unsusbcribe = async (snapshots) => {
      const data = []
      if (snapshots) {
        snapshots.forEach((snap) => data.push(snap.data()))
        const filtered = filterPersonalViews(data).filter((x) => x)
        setViews(filtered)
        setLoading(false)
      }
    }

    if (currentUser) {
      const accountStore = `accounts/${currentUser.accountId}/organizations`
      setStore(accountStore)
      Database.observe(accountStore, unsusbcribe)
    }

    return () => unsusbcribe()
  }, [currentUser])

  return (
    <ViewsContext.Provider
      value={{
        views,
        loading,
        selectView,
        deleteView,
        addView,
        updateView,
      }}
    >
      {children}
    </ViewsContext.Provider>
  )
}

ViewsContextProvider.propTypes = IContext