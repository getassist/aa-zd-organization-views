import React from 'react'
import { Button } from '@zendeskgarden/react-buttons'
import { Col, Row } from '@zendeskgarden/react-grid'
import { XXL } from '@zendeskgarden/react-typography'
import GridContainer from '../../components/GridContainer'
import useEditView from './hooks/useEditView'
import TitleInput from './components/TitleInput'
import ConditionsList from './components/ConditionsList'
import { useParams } from 'react-router-dom'
import PreviewTable from './components/PreviewTable'
import ColumnsList from './components/ColumnsList'
import TypeSelect from './components/TypeSelect'
import ConfirmModal from '../../components/ConfirmModal'
import useConfirmModal from '../../hooks/useConfirmModal'
import { Inline } from '@zendeskgarden/react-loaders'

const EditView = () => {
  const { id } = useParams()
  const { view, validation, handleCancel, handleSave, handleChange, handleValidate, loading } = useEditView(id)
  const confirmModal = useConfirmModal('Are you sure?', handleSave)

  if (!view) return null

  return (
    <GridContainer>
      <Row>
        <Col>
          <XXL>{id ? 'Edit View' : 'Create View'}</XXL>
        </Col>
      </Row>

      <Row style={{ paddingTop: 20 }}>
        <Col lg={7}>
          <TitleInput handleChange={handleChange} value={view.title} validation={validation.title} />
        </Col>
      </Row>

      {view.type !== undefined && (
        <Row style={{ paddingTop: 20 }}>
          <Col size={2}>
            <TypeSelect handleChange={handleChange} value={view.type} validation={validation.type} />
          </Col>
        </Row>
      )}

      {view.conditions && (
        <Row style={{ paddingTop: 30 }}>
          <Col>
            <ConditionsList handleChange={handleChange} value={view.conditions} validation={validation.conditions} />
          </Col>
        </Row>
      )}

      {view.columns && (
        <Row style={{ paddingTop: 30 }}>
          <Col>
            <ColumnsList handleChange={handleChange} value={view.columns} validation={validation.columns}/>
          </Col>
        </Row>
      )}

      <Row style={{ paddingTop: 30 }}>
        <Col>
          <PreviewTable view={view} handleValidate={handleValidate} />
        </Col>
      </Row>

      <Row style={{ paddingTop: 30 }}>
        <Col textAlign='end'>
          
          <Button isBasic onClick={handleCancel}>Cancel</Button>
          <Button isPrimary onClick={confirmModal.openModal} disabled={loading}>
            Save
            {loading ? <Inline style={{marginLeft: 10}}  /> : null}
          </Button>
        
          <ConfirmModal {...confirmModal} />
        </Col>
      </Row>

    </GridContainer>
  )
}

export default EditView