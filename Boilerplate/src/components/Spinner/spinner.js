import * as React from 'react'
import { Spinner } from 'reactstrap'

const ShowSpinner = (props) => {
  return (
    <div
      className={props.classes ?? 'mt-4'}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner
        color={props.color ?? 'warning'}
        size={props.size ?? ''}
        variant={props.variant}
      />
    </div>
  )
}
export default ShowSpinner
