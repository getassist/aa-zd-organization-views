import React, { useEffect, useState } from 'react'
import Client from '../providers/Client'

const TicketSidebar = () => {
    const [context, setContext] = useState()

    useEffect(() => {
        async function getContext() {
            const context = await Client.context()
            setContext(context)
        }
        getContext()
    })

    if (context) {
        return (
            <div>
                TEST
                <div>
                    Ticket ID:
                    <strong>{context.ticketId}</strong>
                </div>
                <div>
                    Subdomain: 
                    <strong>{context.account.subdomain}</strong>
                </div>
                <div>
                    Guid: 
                    <strong>{context.instanceGuid}</strong>
                </div>
                TEST
            </div>
        )
    } else {
        return null
    }
}

export default TicketSidebar
