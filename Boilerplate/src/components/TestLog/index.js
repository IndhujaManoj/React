import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardBody, Row, Col, Button, CardHeader, Input, Modal } from 'sdq-ui'
import { Link } from 'react-router-dom'
import BSTable from 'components/Table/index'
import { TestLogTableColumns } from 'variables/TestLog'
import moment from 'moment'
import {
  getTestLogData,
  getTestSummaryData,
} from 'reduxStore/slices/edit-checks/services/editCheckthunk'
import {
  addtestSummary,
  updateWorkflow,
  triggerEditCheckRun
} from 'reduxStore/slices/edit-checks/services/editCheckthunk'
import {
  downloadRuleTestHarnessLogs,
} from 'reduxStore/slices/test-harness/TestHarnessSlice'
import { getItem } from 'utils/localStorageController'
import TestSummaryModal from './testSummaryModal'; 
import PredictionAnalyzeModal from 'components/Prediction'; 

function TestLog({ testLogConfig, setTestLogConfig }) {
  const testLogApiData = useSelector(
    (state) => state.editChecks.editcheck.editChecksTestLog
  )

  const testSummaryApiData = useSelector(
    (state) => state.editChecks.editcheck.editChecksTestSummary.data
  )

  const prediction_ids = [];  
 
  const [testSummaryConfig, setTestSummaryConfig] = useState({
    isShow: false,
    summary: {},
    rule_name:testLogConfig.rule.name
  })

  const [PredictionAnalyzeModalConfig, setPredictionAnalyzeModalConfig] = useState({
    isShow: false,
    predictionId: null,
    rule_name:testLogConfig.rule.name,
    summary:{},
    prediction_ids
  })

  const role = getItem('crr_role')  
  const [testRuleRunStatus, setTestRuleRunStatus] = useState(testLogConfig.rule.run_status === 'FAILED' ? 'fail' : 'pass')
  const [testLogStatusComment, setTestLogStatusComment] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTestLogData({ edit_check_id : testLogConfig.rule.job_run_id}))
    dispatch(getTestSummaryData({edit_check_id:testLogConfig.rule.sec_id}))
  }, [])
  
  const [isApproveOpen, setIsApproveOpen] = useState(false)
  const [isRejectOpen, setIsRejectOpen] = useState(false)

  const testLogData = testLogApiData.data.map((data) => {
    
    prediction_ids.push(data.id);
    return {
      ...data,
      unique_id: data.id,
      id: (
        <a className="cursor-pointer" onClick={()=>setPredictionAnalyzeModalConfig({...PredictionAnalyzeModalConfig,rule_name:testLogConfig.rule.name,isShow: true,predictionId: data.id,prediction_ids})}>{data.id}</a>
      ),
      query_text: data.query_text
    }
  })

  return (
            <Card>
              <CardHeader>
                <Row>
                  <Col lg="2" className="log-title">
                    <a
                      className="link-default"
                      onClick={() =>
                        {
                          setTestLogConfig({
                            ...testLogConfig,
                            isShow: false,
                          })
                        }
                      }
                    >
                      <i className="fas fa-chevron-left"></i>
                    </a>
                    <span className="log-key-id">
                      {testLogConfig.rule.name}
                    </span>
                  </Col>
                  <Col lg="6">
                    <span className="log-key-title">
                      <h4>Test Results</h4>
                      <p>View and analyse the test results generated post successful study DQ execution</p>
                    </span>
                  </Col>
                  <Col className="text-right" lg='4'>
                    {testLogData.length > 0 && role === 'TESTER' && (
                      <>
                      <Button
                        primary-default
                        small
                        onClick={() => dispatch(downloadRuleTestHarnessLogs(testLogConfig.rule.ec_exc_log_id))}
                      >
                        <i className="fas fa-download mr-2"></i>
                        Download Execution Log
                      </Button>
                      <Button
                      primary-default
                      small
                      onClick={() => {
                        dispatch(
                          triggerEditCheckRun({
                            editCheckids: [testLogConfig.rule.id]
                          })
                        )

                        setTestLogConfig({
                          ...testLogConfig,
                          isShow: false,
                          reloadData:true
                        })
                      }
                        
                      }
                    >
                      Re-Run Test
                    </Button>
                    </>
                    )}

                    {testLogData.length > 0 && role === 'DATA_MANAGER' && (
                      <>
                      <Button
                        success-outline
                        small
                        onClick={() => {
                          setIsApproveOpen((isApproveOpen) => !isApproveOpen)
                        }}
                      >
                        <i className="fas fa-check-circle mr-2"></i>
                        Approve
                      </Button>
                      <Button
                      danger-outline
                      small
                      onClick={() => {
                        setIsRejectOpen((isRejectOpen) => !isRejectOpen)
                      }}
                    >
                      <i className="fas fa-times-circle mr-2"></i>
                      Reject
                    </Button>
                    </>
                    )}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="large-table-card">
                <BSTable
                  columns={TestLogTableColumns}
                  data={testLogData}
                  keyField={'unique_id'}
                  total_records={testLogData.length}
                />
              </CardBody>
              { testLogConfig.isActionEnabled &&
                <Row className="test-log-action">
                    <Col className="my-auto col-md-1">
                      <h3>Actions</h3>
                    </Col>
                    <Col className="my-auto col-md-1" hidden={testLogConfig.rule.run_status === 'FAILED'}>
                        <div className="custom-control custom-radio">
                          
                          <input
                            className="custom-control-input"
                            id="test_passed"
                            name="custom-radio-1"
                            type="radio"
                            defaultChecked={testRuleRunStatus === "pass"}
                            value="pass"
                            onClick={(e)=>{
                              setTestLogStatusComment('')
                              setTestRuleRunStatus(e.currentTarget.value)
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="test_passed"
                          >
                            Passed
                          </label>
                        </div>
                        </Col>
                        <Col className="my-auto col-md-1">

                        <div className="custom-control custom-radio">
                          
                          <input
                            className="custom-control-input"
                            id="test_failed"
                            name="custom-radio-1"
                            type="radio"
                            value="fail"
                            defaultChecked={testRuleRunStatus === "fail"}
                            onClick={(e)=>setTestRuleRunStatus(e.currentTarget.value)}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="test_failed"
                          >
                            Failed
                          </label>
                        </div>
                        </Col>
                        <Col className="my-auto col-md-9">
                         {testRuleRunStatus === "pass" ? 
                         <Col className="col-md-6">
                          <Button
                            primary
                            small
                            onClick={()=> {
                              dispatch(
                                addtestSummary({
                                  job_run_id:testLogConfig.rule.job_run_id,
                                  study_edit_check_id:testLogConfig.rule.sec_id,
                                  test_status:"PASSED",
                                  comment:"" 
                                })
                              )
                              dispatch(
                                updateWorkflow({
                                  api_body: {
                                    status:
                                      role === 'DEVELOPER' ? 'TESTING' : 'PENDING_APPROVAL',
                                    comments: '',
                                  },
                                  id: testLogConfig.rule.id,
                                  action: '',
                                })
                              )
                              setTestLogConfig({
                                ...testLogConfig,
                                isShow: false,
                                reloadData: true,
                                rule: {}
                              })

                            } }
                            >
                              Send for approval
                            </Button> 
                          </Col> :

                            <Row>
                            <Col className="my-auto col-md-2 testLogActionComment">
                              <label>Comment <span className="red"> *</span></label>
                            </Col>  
                            <Col className="my-auto col-md-4">
                              <Input
                                required
                                onChange={(e)=>setTestLogStatusComment(e.target.value)}
                                value={testLogStatusComment}
                              >
                              </Input>
                            </Col>
                            <Col className="my-auto col-md-4">
                              <Button
                                primary
                                small
                                disabled={testLogStatusComment.length == 0}
                                onClick={()=> {
                                  dispatch(
                                    addtestSummary({
                                      job_run_id:testLogConfig.rule.job_run_id,
                                      study_edit_check_id:testLogConfig.rule.sec_id,
                                      test_status:"FAILED",
                                      comment:testLogStatusComment 
                                    })
                                    
                                  )
                                  dispatch(
                                    updateWorkflow({
                                      api_body: {
                                        status: 'DEVELOPMENT',
                                        comments: '',
                                      },
                                      id: testLogConfig.rule.id,
                                      action: '',
                                    })
                                  )

                                  setTestLogConfig({
                                    ...testLogConfig,
                                    isShow: false,
                                    reloadData: true,
                                    rule: {}
                                  })

                                } }
                                >
                                Send Back to Dev
                              </Button> 
                            </Col>
                            </Row>}
                        </Col>
                </Row>
                  }

                 { testSummaryApiData.length>0 &&
                <Row className="test-summary">
                  <Col>
                    <Card>
                      <CardHeader>
                        <h5 className="h3 mb-0">Test Summary </h5>
                      </CardHeader>
                      <CardBody>
                          <ul className='list-unstyled list-group'>
                            { testSummaryApiData.map((summary,index)=>{
                                let badge_class = (summary.test_status == 'PASSED') ? 'info' : 'danger';
                                return (
                                  <li key={index}>
                                  <span className={`badge ${badge_class} mr-2`}>{summary.test_status}</span>
                                  <span className="mr-2">{moment(summary.created_at).format('MM/DD/YYYY HH:mm:ss')}</span> 
                                  <span className="mr-2">|</span> 
                                  <span className="mr-2">{summary.email}</span> 
                                  <a onClick={()=>setTestSummaryConfig({...testSummaryConfig,isShow: true,summary: summary})} className="mr-2 cursor-pointer">View</a>
                                  {summary.comment !== '' && <span className="summary-comment">{summary.comment}</span>}
                                </li>
                                )
                              }
                            
                            )}
                          </ul>
                          {testSummaryConfig.isShow && <TestSummaryModal config={testSummaryConfig} setTestSummaryConfig={setTestSummaryConfig} />}
                      </CardBody>
                    </Card>
                  </Col>
                </Row> }   

                { role=="DATA_MANAGER" && 
                  <>
                    <Modal
                      className="modal-dialog-centered"
                      isOpen={isApproveOpen}
                      toggle={() => setIsApproveOpen((isApproveOpen) => !isApproveOpen)}
                      backdrop="static"
                    >
                      <div className="modal-header">
                        <h6 className="modal-title" id="modal-title-default">
                          Approve
                        </h6>
                        <button
                          aria-label="Close"
                          className="close"
                          data-dismiss="modal"
                          type="button"
                          onClick={() => setIsApproveOpen((isApproveOpen) => !isApproveOpen)}
                        >
                          <span aria-hidden={true}>×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        Are you sure you want to approve the DQ?
                      </div>
                      <div className="modal-footer">
                        <Button
                          secondary
                          data-dismiss="modal"
                          type="button"
                          small
                          onClick={() => setIsApproveOpen((isApproveOpen) => !isApproveOpen)}
                        >
                          No
                        </Button>
                        <Button
                          primary
                          type="button"
                          small
                          onClick={() => {
                            dispatch(
                              updateWorkflow({
                                api_body: {
                                  status: 'APPROVED',
                                  comments: '',
                                },
                                id: testLogConfig.rule.id,
                                action: '',
                                content: 'EC Approved Successfully',
                              })
                            )
                            setIsApproveOpen(false)
                            setTestLogConfig({
                              ...testLogConfig,
                              isShow: false,
                              reloadData: true,
                              rule: {}
                            })
                          }}
                        >
                          Yes
                        </Button>
                      </div>
                    </Modal>
                    <Modal
                      className="modal-dialog-centered"
                      isOpen={isRejectOpen}
                      toggle={() => setIsRejectOpen((isRejectOpen) => !isRejectOpen)}
                      backdrop="static"
                    >
                      <div className="modal-header">
                        <h6 className="modal-title" id="modal-title-default">
                          Reject
                        </h6>
                        <button
                          aria-label="Close"
                          className="close"
                          data-dismiss="modal"
                          type="button"
                          onClick={() => setIsRejectOpen((isRejectOpen) => !isRejectOpen)}
                        >
                          <span aria-hidden={true}>×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        Are you sure you want to reject the DQ?
                      </div>
                      <div className="modal-footer">
                        <Button
                          secondary
                          data-dismiss="modal"
                          type="button"
                          small
                          onClick={() => setIsRejectOpen((isRejectOpen) => !isRejectOpen)}
                        >
                          Cancel
                        </Button>
                        <Button
                          primary
                          type="button"
                          small
                          onClick={() => {
                            dispatch(
                              updateWorkflow({
                                api_body: { status: 'REJECTED', comments: '' },
                                id: testLogConfig.rule.id,
                                action: '',
                                content: 'EC Rejected Successfully',
                              })
                            )
                            setIsRejectOpen(false)
                            setTestLogConfig({
                              ...testLogConfig,
                              isShow: false,
                              reloadData: true,
                              rule: {}
                            })
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                    </Modal>
                  </>
                }
                {PredictionAnalyzeModalConfig.isShow && <PredictionAnalyzeModal config={PredictionAnalyzeModalConfig} setPredictionAnalyzeModalConfig={setPredictionAnalyzeModalConfig} />}
              </Card> 
  )
}

export default TestLog
