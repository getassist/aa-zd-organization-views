import React from 'react'
import { Modal, Header, Body, Footer, FooterItem, Close } from '@zendeskgarden/react-modals'
import { Button } from '@zendeskgarden/react-buttons'
import { IConfirmModal } from '../providers/Interfaces'
import { XL } from '@zendeskgarden/react-typography'

const ConfirmModal = ({ showModal, message, closeModal, handleConfirm }) => {

  return (showModal && (
    <Modal style={{maxWidth: 450}}>
      <Body>
        <XL>{message}</XL>
      </Body>
      <Footer>
        <FooterItem>
          <Button onClick={closeModal} isBasic>Cancel</Button>
        </FooterItem>
        <FooterItem>
          <Button onClick={handleConfirm} isPrimary>Confirm</Button>
        </FooterItem>
      </Footer>
    </Modal>
  ))
}

export default ConfirmModal

ConfirmModal.propTypes = IConfirmModal