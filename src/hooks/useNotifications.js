import React, { useCallback } from 'react'
import { useToast, Notification, Alert, Title } from '@zendeskgarden/react-notifications'

const useNotifications = () => {
  const { addToast } = useToast()

  const notify = useCallback((message, type, title, location) => {
    addToast(() => (
      <Notification type={type || 'info'} style={{ maxWidth: 450 }}>
        {title && (<Title>{title}</Title>)}
        {message}
      </Notification>
    ),
      { placement: location || 'top-end' }
    )
  })

  const alert = useCallback((message, type, title, location) => {
    addToast(() => (
      <Alert type={type || 'info'} style={{ maxWidth: 450 }}>
        {title && (<Title>{title}</Title>)}
        {message}
      </Alert>
    ),
      { placement: location || 'top-end' }
    )
  })

  return { notify, alert }
}

export default useNotifications