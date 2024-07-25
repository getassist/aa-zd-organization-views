import { useContext, useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ViewsContext } from '../../../contexts/ViewsContext'
import { viewValidator } from '../../../providers/Validators'
import { isEmptyObject } from '../../../providers/Helpers'

const initialState = {
  title: '',
  type: { value: 'shared', label: 'Shared' },
  conditions: [],
  columns: [],
}

const viewReducer = (state, action) => {
  switch (action.type) {
    case 'set_view':
      return { ...action.form }

    case 'set_field':
      return { ...state, [action.field]: action.value }

    case 'reset_view':
      return initialState

    default:
      return
  }
}

const useEditView = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const { views, addView, updateView } = useContext(ViewsContext)
  const [view, dispatch] = useReducer(viewReducer, {})
  const [validation, setValidation] = useState({})
  const [loading, setLoading] = useState(false)

  const handleValidate = () => {
    const viewErrors = viewValidator(view)

    setValidation(viewErrors)
    if (isEmptyObject(viewErrors)) return true
    return false
  }


  const handleCancel = () => {
    if (id) return navigate(`/display/${id}`)
    return navigate(-1)
  }

  const handleSave = async () => {
    if (!handleValidate()) return false
    
    setLoading(true)
    if (view.id) {
      return updateView(view)
    } else {
      return addView(view)
    }
  }

  const handleChange = (field, value) => {
    dispatch({ type: 'set_field', field, value })
  }

  useEffect(() => {
    // handle create
    dispatch({ type: 'reset_view' })

    // handle edit
    if (id) {
      const viewDetails = views.find((x) => x.id === id)
      dispatch({ type: 'set_view', form: viewDetails })
    }

    // cleanup
    return () => dispatch({ type: 'reset_view' })
  }, [id])

  return {
    view,
    validation,
    handleChange,
    handleCancel,
    handleSave,
    handleValidate,
    loading,
  }
}

export default useEditView
