import React from 'react'
import { useSelector } from 'react-redux'

export default function Select(params) {
  const table_data = useSelector((state) => state.testHarness.table_data)
  let col_name = params.colDef.field
  let run_status = table_data[3][col_name] ?? ''
  let value = true
  let loading = false
  let pass = false
  let fail = false

  if (
    params.data.DOMAIN === 'Actual Output' &&
    (run_status === 'SCHEDULED' || run_status === 'RUNNING')
  ) {
    value = false
    loading = true
  }
  if (params.data.DOMAIN === 'Result') {
    value = false

    if (run_status === 'SCHEDULED' || run_status === 'RUNNING') {
      loading = true
    } else if (params.value === 'PASS') {
      pass = true
    } else if (params.value === 'FAIL') {
      fail = true
    }
  }
  return (
    <span>
      {value && <div>{params.value}</div>}
      {loading && (
        <div style={{ padding: '15px 25px' }}>
          <div className="dot-flashing"></div>
        </div>
      )}
      {pass && <div className="Pass">Pass</div>}
      {fail && <div className="Fail">Fail</div>}
    </span>
  )
}
