import { Button } from '@zendeskgarden/react-buttons'
import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { XXL } from '@zendeskgarden/react-typography'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Client from '../providers/Client'
import { useNavigate } from 'react-router-dom'
import Database from '../providers/Database'
import Loading from './Loading'

const AuthMain = () => {
  const navigate = useNavigate()
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [zendeskUser, setZendesUser] = useState(null)
  const [subdomain, setSubdomain] = useState(null)

  const getAccount = async () => {
    const accountResults = await Database.find('accounts', 'subdomain', subdomain)
    if (accountResults[0]) return accountResults[0]

    const newAccount = {
      active: true,
      subdomain: subdomain,
      createdBy: zendeskUser.id + '',
    }
    const account = await Database.add('accounts', newAccount)
    return account
  }

  const getUser = async (account) => {
    const conditions = [
      {
        field: 'subdomain',
        operator: '==',
        value: subdomain,
      },
      {
        field: 'zendeskId',
        operator: '==',
        value: zendeskUser.id + '',
      }
    ]

    const userResults = await Database.query('users', conditions)
    if (userResults[0]) return userResults[0]

    const newUser = {
      zendeskId: zendeskUser.id + '',
      accountId: account.id,
      subdomain: subdomain,
      email: zendeskUser.email,
      name: zendeskUser.name,
      role: zendeskUser.role,
    }
    const user = await Database.add('users', newUser)
    return user
  }

  const handleGetStarted = async () => {
    setLoading(true)

    const account = await getAccount()

    const user = await getUser(account)

    setCurrentUser(user)
  }

  const handleNoCurrentUser = async () => {
    const context = await Client.context()
    const subdomain = context.account.subdomain
    setSubdomain(subdomain)
    
    const user = await Client.get('currentUser')
    setZendesUser(user)

    setLoading(false)
  }

  useEffect(() => {
    if (currentUser) navigate('/')
    else handleNoCurrentUser()
  }, [currentUser])

  if (loading) return <Loading />

  if (!zendeskUser) return <Loading />

  return (
    <Grid>
      <Row alignItems='stretch' style={{ marginTop: 50 }}>
        <Col alignSelf='center' size={12} textAlign='center'>
          <XXL>
            Welcome to Organization Views,
            {` ${zendeskUser.name}`}
            !
          </XXL>
          <Button style={{ marginTop: 50 }} isPrimary onClick={handleGetStarted}>Get Started</Button>
        </Col>
      </Row>
    </Grid>
  )
}

export default AuthMain
