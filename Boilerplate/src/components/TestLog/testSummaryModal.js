import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Row, Modal } from 'sdq-ui'
import BSTable from 'components/Table/index'
import moment from 'moment'
import {
    getTestLogData
  } from 'reduxStore/slices/edit-checks/services/editCheckthunk'
import { TestLogTableColumns } from 'variables/TestLog'
import PredictionAnalyzeModal from 'components/Prediction'; 

function TestSummaryModal({config,setTestSummaryConfig}) { 

  const dispatch = useDispatch()

  const [modalState, setModalState] = useState(false)

  const editChecksTestSummaryTableData = useSelector(
    (state) => state.editChecks.editcheck.editChecksTestSummaryTableData.data
  )

  const prediction_ids = [];

  useEffect(() => { setModalState(config.isShow)},[config.isShow] )

  useEffect(() => {

      if(config.isShow){
        dispatch(getTestLogData({ edit_check_id:config.summary.job_run_id,from:"TEST_SUMMARY"}))
      }
    
  }, [])

  const [PredictionAnalyzeModalConfig, setPredictionAnalyzeModalConfig] = useState({
    isShow: false,
    predictionId: null,
    rule_name:config.rule_name,
    summary:config.summary,
    prediction_ids
  })

  const testLogTableData = editChecksTestSummaryTableData.map((data) => {
    prediction_ids.push(data.id);
    return {
      ...data,
      unique_id: data.id,
      id: (
        <a className="cursor-pointer" onClick={()=>setPredictionAnalyzeModalConfig({...PredictionAnalyzeModalConfig,isShow: true,predictionId: data.id,prediction_ids})}>{data.id}</a>
      ),
      query_text: data.query_text.substring(1, 20)
    }
  })

  

  const toggleState = () => {
    setModalState(!modalState)
    setTestSummaryConfig({
        ...config,
        isShow: false,
        summary: {},
    })
  }

  return (
    <>
      <Modal
        className="tester-log-table"
        size="lg"
        isOpen={modalState}
        toggle={() => toggleState()}
        backdrop="static"
        fade={true}
      >
        <div className="modal-header">
          <h6 className="modal-title test-summary " id="modal-test-summary">
            Test Summary
            <ul className="list-unstyled list-group">
              <li>
                <span className="mr-2">{config.rule_name
                }</span>
                <span className="mr-2">|</span>
                <span className="mr-2">
                  {moment(config.summary.created_at).format(
                    'MM/DD/YYYY HH:mm:ss'
                  )}
                </span>
                <span className="mr-2">|</span>
                <span className="mr-2">
                  Tester Name:{' '}
                  {config.summary.first_name + ' ' + config.summary.last_name}
                </span>
                <span className="mr-2">|</span>
                <span
                  className={`badge ${
                    config.summary.test_status == 'PASSED' ? 'info' : 'danger'
                  } mr-2`}
                >
                  {config.summary.test_status}
                </span>
                {config.summary.comment !== '' && (
                  <span className="summary-comment">
                    {config.summary.comment}
                  </span>
                )}
              </li>
            </ul>
          </h6>

          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={toggleState}
          >
            <span aria-hidden={true} data-test-id="studies-close">
              ×
            </span>
          </button>
        </div>
        <div className="modal-body">
          <Row>
            <div className="col">
              <Card>
                <BSTable
                  columns={TestLogTableColumns}
                  data={testLogTableData}
                  keyField={'unique_id'}
                  total_records={testLogTableData.length}
                />
              </Card>
            </div>
          </Row>
        </div>
      </Modal>

      {PredictionAnalyzeModalConfig.isShow && (
        <PredictionAnalyzeModal
          config={PredictionAnalyzeModalConfig}
          setPredictionAnalyzeModalConfig={setPredictionAnalyzeModalConfig}
        />
      )}
    </>
  )
}

export default TestSummaryModal
