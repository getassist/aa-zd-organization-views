import { useState } from 'react'

const useConfirmModal = (message, confirmAction) => {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction()
      closeModal()
    }
  }

  return {
    showModal,
    message,
    openModal,
    closeModal,
    handleConfirm,
  }
}

export default useConfirmModal