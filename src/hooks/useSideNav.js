import { useContext, useEffect, useState } from 'react'
import { ViewsContext } from '../contexts/ViewsContext'
import { ViewTypes } from '../providers/Constants'
import { filterArray, sortArray } from '../providers/Helpers'

const useSideNav = () => {
  const { views, selectView } = useContext(ViewsContext)
  const [types]  = useState(ViewTypes)
  const [navItems, setNavItems] = useState({})
  const [searchInput, setSearchInput] = useState('')

  const handleSelect = (item) => {
    selectView(item)
  }

  const handleSearch = (value) => {
    setSearchInput(value)
  }

  const createNavItems = (items) => {
    const navItems = {}

    items.forEach((item) => {
      types.forEach((type) => {

        if (navItems[type.value] === undefined) navItems[type.value] = []

        if (item.type.value === type.value) navItems[type.value].push(item)

      })
    })

    return navItems
  }

  useEffect(() => {
    if (views && views.length) {
      const sortedViews = sortArray(views, 'title')

      if (!searchInput) setNavItems(createNavItems(sortedViews))
  
      // handle search
      const filteredViews = filterArray(views, 'title', searchInput)
      setNavItems(createNavItems(filteredViews))
    }
  }, [views, searchInput])

  return {
    navItems,
    navItemGroups: ViewTypes,
    handleSelect,
    handleSearch,
  }
}

export default useSideNav
