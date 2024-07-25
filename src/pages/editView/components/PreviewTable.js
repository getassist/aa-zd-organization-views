import React, { useState } from 'react'
import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { LG, SM, Span } from '@zendeskgarden/react-typography'
import { Button } from '@zendeskgarden/react-buttons'
import ViewTable from '../../../components/ViewTable'
import { IPreviewTable } from '../../../providers/Interfaces'
import useSearch from '../../../hooks/useSearch'

const PreviewTable = ({view, handleValidate}) => {
  const [ show, setShow ] = useState(false)
  const { buildQuery, setQuery, results, resultsCount } = useSearch()

  const handlePreview = async () => {
    const isValid = handleValidate()

    if (isValid){
      const query = buildQuery(view.conditions)
      setQuery(query)
      return setShow(true)
    } 
  }

  return (
    <Grid gutters={false}>
      <Row>
        <Col>
          <LG>Preview</LG>
        </Col>
      </Row>

      <Row style={{ marginTop: 20 }}>
        <Col>
          <Button onClick={handlePreview}>
            {show ? 'Refresh Preview' : 'Show Preview'}
          </Button>
        </Col>
      </Row>

      {show && (
        <Row style={{ marginTop: 20 }}>
          <Col>
            <div>
              <SM>
                There are
                {' '}
                <Span isBold>{resultsCount}</Span>
                {' '}
                matching records found.
              </SM>
            </div>
          </Col>
        </Row>
      )}

      {show && (
        <Row style={{ marginTop: 20 }}>
          <Col>
            <ViewTable columns={view.columns} data={results} />
          </Col>
        </Row>
      )}

    </Grid>
  )
}

export default PreviewTable

PreviewTable.propTypes = IPreviewTable