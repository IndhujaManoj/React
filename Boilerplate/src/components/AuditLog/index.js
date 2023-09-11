import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardBody, Row, Col, Button, CardHeader } from 'sdq-ui'
import BSTable from 'components/Table/index'
import { AuditLogTableColumns } from 'variables/AuditLog'
import moment from 'moment'
import { getAuditLogList, clearList } from 'reduxStore/slices/audit-log/index'
function AuditLog({ auditLogConfig, setAuditLogConfig }) {
  const { list } = useSelector((state) => state.auditLogNew)
  const audit_log = list.map((data) => {
    let badge_class
    switch (data.action) {
      case 'CREATE':
        badge_class = 'badge-light'
        break
      case 'UPDATE':
        badge_class = 'badge-success'
        break
      case 'DELETE':
        badge_class = 'badge-warning'
        break
      default:
        badge_class = 'badge-error'
    }
    return {
      ...data,
      event_time: moment(data.event_time).format('DD-MMM-YYYY HH:mm:ss'),
      user_name: (
        <>
          <h5 className="mb-0">{data.user_name}</h5>
          <small>{data.user_role}</small>
        </>
      ),
      previous_values: (
        <pre style={{ whiteSpace: 'pre-wrap'}}>{JSON.stringify(data.previous_values, null, 4)}</pre>
      ),
      current_values: <pre>{JSON.stringify(data.current_values, null, 4)}</pre>,
      action: (
        <span className={`badge-lg badge ${badge_class}`} style={{ whiteSpace: 'pre-wrap'}}>{data.action}</span>
      ),
    }
  })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAuditLogList({ ...auditLogConfig, exportLog: false }))
  }, [])

  return (
            <Card>
              <CardHeader>
                <Row>
                  <Col lg="3">
                    <a
                      className="link-default"
                      onClick={() =>
                        {
                          setAuditLogConfig({
                            ...auditLogConfig,
                            isShow: false,
                          })
                          dispatch(clearList());
                        }
                      }
                    >
                      <i className="fas fa-chevron-left"></i>
                    </a>
                    <span className="auditlog-key-id">
                      {auditLogConfig.entity_name}
                    </span>
                  </Col>
                  {
                    auditLogConfig.parent_entity_id && (
                      <Col lg="2">
                      <span className="log-key-title">
                        {auditLogConfig.parent_entity_id}
                      </span>
                    </Col>
                    )
                  }
                  <Col lg="3">
                    <span className="log-key-title">
                      {auditLogConfig.entity_display_name}
                    </span>
                  </Col>
                  <Col className="text-right">
                    {list.length > 0 && (
                      <Button
                        primary-outline
                        small
                        onClick={() =>
                          dispatch(
                            getAuditLogList({
                              ...auditLogConfig,
                              exportLog: true,
                            })
                          )
                        }
                      >
                        <i className="fas fa-download mr-2"></i>
                        Download Audit Log
                      </Button>
                    )}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <BSTable
                  columns={AuditLogTableColumns}
                  data={audit_log}
                  keyField={'id'}
                />
              </CardBody>
            </Card>
  )
}

export default AuditLog
