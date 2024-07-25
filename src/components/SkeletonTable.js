import React from 'react'
import PropTypes from 'prop-types'
import { Table, Body, Row, Cell, Head, HeaderRow, HeaderCell } from '@zendeskgarden/react-tables'
import { MD } from '@zendeskgarden/react-typography'
import { Skeleton } from '@zendeskgarden/react-loaders'
import { Checkbox, Field, Label } from '@zendeskgarden/react-forms'

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const SkeletonTable = ({ columns }) => {
  return (
    <>
      <Table>
        <Head>
          <HeaderRow>
            <HeaderCell isMinimum>
              <Field>
                <Checkbox disabled>
                  <Label hidden>Select all</Label>
                </Checkbox>
              </Field>
            </HeaderCell>
            <HeaderCell>
              <MD><Skeleton height='20px' width='30%' /></MD>
            </HeaderCell>
            <HeaderCell>
              <MD><Skeleton height='20px' width='30%' /></MD>
            </HeaderCell>
            <HeaderCell>
              <MD><Skeleton height='20px' width='30%' /></MD>
            </HeaderCell>
          </HeaderRow>
        </Head>
        <Body>
          {array.map((x) => (
            <Row key={x}>
              <Cell isMinimum>
                <Field>
                  <Checkbox disabled>
                    <Label hidden>Select all</Label>
                  </Checkbox>
                </Field>
              </Cell>
              <Cell><Skeleton width='30%' /></Cell>
              <Cell><Skeleton width='50%' /></Cell>
              <Cell><Skeleton width='80%' /></Cell>
            </Row>
          ))}

        </Body>
      </Table>
    </>
  )
}

export default SkeletonTable

SkeletonTable.propTypes = {
  columns: PropTypes.number,
}
