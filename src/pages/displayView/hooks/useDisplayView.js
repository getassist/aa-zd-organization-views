import { useContext, useEffect, useState } from 'react'
import { ViewsContext } from '../../../contexts/ViewsContext'
import useSearch from '../../../hooks/useSearch'
import Client from '../../../providers/Client'
import useConfirmModal from '../../../hooks/useConfirmModal'
import useExport from '../../../hooks/useExport'
import { useNavigate } from 'react-router-dom'

const useDisplayView = (id) => {
  const { views, deleteView } = useContext(ViewsContext)
  const { loadingExports, exportView } = useExport()
  const navigate = useNavigate()
  const {
    results,
    resultsCount,
    page,
    pageSize,
    pageCount,
    buildQuery,
    setQuery,
    setPage,
    setPageSize,
  } = useSearch()
  const [view, setView] = useState(null)
  const [columns, setColumns] = useState([])
  const [data, setData] = useState([])
  
  const confirmModal = useConfirmModal('Are you sure you want to delete?',  () => deleteView(view))

  const handleMenu = (event) => {
    if (event.type !== 'menuItem:click') return
    const action = event.value

    switch (action) {
      case 'delete':
        return confirmModal.openModal()

      case 'edit':
        return navigate(`/edit/${view.id}`)

      case 'export':
        return exportView(view)

      default:
        return
    }
  }

  useEffect(() => {
    if (id) {
      const viewDetails = views.find((x) => x.id === id)
      const query = buildQuery(viewDetails.conditions)

      setQuery(query)
      setView(viewDetails)
      setColumns(viewDetails.columns)
    }
  }, [id])

  useEffect(() => {
    setData(results)
  }, [results])

  const handleRowClick = (row) => {
    Client.open('organization', row.original.id)
  }

  return {
    view,
    columns,
    data,
    count: resultsCount,
    page,
    pageSize,
    pageCount,
    setPage,
    setPageSize,
    handleRowClick,
    confirmModal,
    handleMenu,
    loadingExports,
  }
}

export default useDisplayView
