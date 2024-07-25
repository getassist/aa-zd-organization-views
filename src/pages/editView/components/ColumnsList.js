import React, { useEffect, useState } from 'react'
import { Button, IconButton } from '@zendeskgarden/react-buttons'
import { Field, Message } from '@zendeskgarden/react-forms'
import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { LG } from '@zendeskgarden/react-typography'
import XIcon from '@zendeskgarden/svg-icons/src/16/x-stroke.svg'
import { Draggable, DraggableList } from '@zendeskgarden/react-drag-drop'
import { filterArrayFromArray, uuid } from '../../../providers/Helpers'
import { IColumnsList } from '../../../providers/Interfaces'
import Select from '../../../components/Select'
import useOrganizationFields from '../../../hooks/useOrganizationFields'


const ColumnsList = ({ value, handleChange, validation }) => {
  const organizationFields = useOrganizationFields()
  const [columns, setColumns] = useState(value)
  const [selecting, setSelecting] = useState(false)
  const [columnOptions, setColumnOptions] = useState([])

  const handleRemove = (column) => {
    const newColumns = columns.filter((x) => x.id !== column.id)
    setColumns(newColumns)
  }

  const handleAdd = () => {
    setSelecting(true)
  }

  const handleSelect = (value) => {
    const id = uuid(8)
    const newColumn = { id, ...value }
    setColumns([...columns, newColumn])
    setSelecting(false)
  }

  useEffect(() => {
    handleChange('columns', columns)

    const newOptions = filterArrayFromArray(organizationFields, columns, 'key')
    setColumnOptions(newOptions)
  }, [columns])


  // handle initial values
  useEffect(() => {
    const newOptions = filterArrayFromArray(organizationFields, value, 'key')

    setColumns(value)
    setColumnOptions(newOptions)
  }, [organizationFields, value])

  if (!organizationFields) return null

  return (
    <Grid gutters={false}>
      <Row>
        <Col>
          <LG>Columns</LG>
        </Col>
      </Row>

      {validation && (
        <Row>
          <Col>
            <Field style={{ marginTop: 20 }}>
              <Message validation='error' validationLabel='validation'>
                {validation}
              </Message>
            </Field>
          </Col>
        </Row>
      )}

      {columns && columns.length > 0 && (
        <Row style={{ marginTop: 20 }}>
          <Col sm={4}>
            <DraggableList>
              {columns.map(column => (
                <DraggableList.Item key={column.id}>
                  <Draggable isCompact>
                    <Draggable.Grip />
                    <Draggable.Content>{column.title}</Draggable.Content>
                    <IconButton isPill={false} onClick={() => handleRemove(column)} >
                      <XIcon />
                    </IconButton>
                  </Draggable>
                </DraggableList.Item>
              ))}
            </DraggableList>
          </Col>
        </Row>
      )}

      {selecting && (
        <Row style={{ marginTop: 20 }}>
          <Col sm={4}>
            <Select handleChange={handleSelect} options={columnOptions} defaultExpanded={true} />
          </Col>
        </Row>
      )}

      {!selecting && (
        <Row>
          <Col>
            <Button style={{ marginTop: 20 }} onClick={handleAdd}>
              Add Columns
            </Button>
          </Col>
        </Row>

      )}

    </Grid>
  )
}

export default ColumnsList

ColumnsList.propTypes = IColumnsList